<template>
  <header>
    <HeaderLogo />
    <FileUpload @data-upload="handleUpload" />
    <WMSForm @search="generateImage" />
    <WMSImage :img-src="imageSource" />
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
    height: 100vh;
    padding: 2rem;
  }
}
</style>