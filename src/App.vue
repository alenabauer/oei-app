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
import { ref } from "vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import SentinelApiService from "@/api/SentinelApiService";
import {Buffer} from "buffer";
function calculateMinMaxCoordinates(geojson) {
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;

  const processCoordinates = (coordinates) => {
    coordinates.forEach((ring) => {
      ring.forEach(([lon, lat]) => {
        // Update minimum and maximum values
        minLon = Math.min(minLon, lon);
        minLat = Math.min(minLat, lat);
        maxLon = Math.max(maxLon, lon);
        maxLat = Math.max(maxLat, lat);
      });
    });
  };

  const geometry = geojson.geometry;
  const type = geometry.type;

  if (type === "Polygon") {
    processCoordinates(geometry.coordinates);
  } else if (type === "MultiPolygon") {
    geometry.coordinates.forEach((coordinates) => {
      processCoordinates(coordinates);
    });
  }

  // south, west, north, east
  return {
    minLat,
    minLon,
    maxLat,
    maxLon,
  }
}


export default {
  components: {
    WMSForm,
    WMSImage,
    MapContainer,
    FileUpload,
    HeaderLogo,
  },
  setup() {
    const geojson = ref(null);
    const imageSource = ref('');

    const handleUpload = async (data) => {
      geojson.value = data;
    };

    const generateImage = async (params) => {
      const bbox = geojson.value ? calculateMinMaxCoordinates(geojson.value) : null;
      try {
        SentinelApiService.getImage(bbox, params).then((response) => {
          const base64ImageString = Buffer.from(response, 'binary').toString('base64')
          imageSource.value = "data:image/png;base64,"+base64ImageString
        })
      } catch (error) {
        console.error(error);
      }
    }

    return {
      geojson,
      handleUpload,
      generateImage,
      imageSource,
    };
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