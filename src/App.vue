<template>
  <header>
    <HeaderLogo />
    <FileUpload @data-upload="handleUpload" />
<!--    display the WMS request params form once a geojson file is uploaded -->
    <WMSForm v-if="geojson" @search="generateImage" />
    <WMSImage v-if="imageSource" :img-src="imageSource" />
  </header>

  <main>
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
    };
  },
  methods: {
    handleUpload(data) {
      this.geojson = data;
    },
    async generateImage(params) {
      const bbox = this.geojson ? calculateMinMaxCoordinates(this.geojson) : null;
      try {
        const response = await SentinelApiService.getImage(bbox, params);
        const base64ImageString = Buffer.from(response, "binary").toString("base64");
        this.imageSource = "data:image/png;base64," + base64ImageString;
      } catch (error) {
        console.error(error);
      }
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