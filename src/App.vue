<template>
  <header>
    <HeaderLogo />
    <GeoJSONFileUploader @data-upload="handleUpload" />
<!--    display the WMS request params form once a geojson file is uploaded -->
    <WMSForm v-if="geojson" @submit="generateImage" />
  </header>

  <main>
    <WMSImage v-if="imageSource && showImageModal" :img-src="imageSource" @close="showImageModal = false" />
    <MapContainer :geojson="geojson" />
  </main>
</template>

<script>
import MapContainer from "@/components/map/MapContainer.vue";
import WMSForm from "@/components/wms/WMSForm.vue";
import WMSImage from "@/components/wms/WMSImage.vue";
import GeoJSONFileUploader from "@/components/geojson/GeoJSONFileUploader.vue";
import HeaderLogo from "@/components/header/HeaderLogo.vue";
import SentinelApiService from "@/api/SentinelApiService";
import { Buffer } from "buffer";
import { calculateMinMaxCoordinates } from "@/helpers/helpers";
import { computed } from "vue";

export default {
  components: {
    WMSForm,
    WMSImage,
    MapContainer,
    GeoJSONFileUploader,
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
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  margin: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(var(--color-blue-dark-rgb), 0.8);
  width: 100vw;
}
main {
  width: 100vw;
  height: 60vh;
}
@media screen and (min-width: 1024px) {
  header {
    position: absolute;
    width: 400px;
    margin: 2rem;
  }
  main {
    width: 100vw;
    height: 100vh;
  }
}
</style>