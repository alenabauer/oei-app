<template>
  <header>
    <HeaderLogo />
    <FileUpload @data-upload="handleUpload" />
<!--    display the WMS request params form once a geojson file is uploaded -->
    <WMSForm v-if="geojson" @search="generateImage" />
  </header>

  <main>
    <WMSImage v-if="imageSource && showImageModal" :img-src="imageSource" @close="showImageModal = false" />
    <MapContainer :geojson="geojson" />
  </main>
</template>

<script>
import MapContainer from "@/components/MapContainer.vue";
import FileUpload from "@/components/FileUpload.vue";
import WMSForm from "@/components/WMSForm.vue";
import WMSImage from "@/components/WMSImage.vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import SentinelApiService from "@/api/SentinelApiService";
import { Buffer } from "buffer";
import { calculateMinMaxCoordinates } from "@/helpers/helpers";
import { computed } from "vue";

export default {
  components: {
    WMSForm,
    WMSImage,
    MapContainer,
    FileUpload,
    HeaderLogo,
  },
  data() {
    return {
      geojson: null,
      imageSource: "",
      showImageModal: false,
      loading: false,
    };
  },
  provide: function () {
    return {
      loading: computed(() => this.loading),
    };
  },
  methods: {
    handleUpload(data) {
      this.geojson = data;
    },
    async generateImage(params) {
      this.loading = true;
      const bbox = this.geojson ? calculateMinMaxCoordinates(this.geojson) : null;
      try {
        const response = await SentinelApiService.getImage(bbox, params);
        const base64ImageString = Buffer.from(response, "binary").toString("base64");
        this.imageSource = "data:image/png;base64," + base64ImageString;
        this.showImageModal = true;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
};

</script>
<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin: 2rem;
    position: absolute;
    right: 0;
    z-index: 10;
    background-color: rgba(var(--color-blue-dark-rgb), 0.8);
    width: 400px;
  }
  main {
    width: 100vw;
    height: 100vh;
  }
}
</style>