<template>
  <header>
    <img alt="OEI logo" class="logo" src="./assets/logo.png" width="75" height="75" />

    <FileUpload @data-upload="handleUpload" />
    <SearchForm @search="searchApi" />
    <SearchResultsList :searchResults="searchResults" />
  </header>

  <main>
    <MapContainer :geojson="geojson" />
  </main>
</template>

<script>
import MapContainer from "@/components/MapContainer.vue";
import FileUpload from "@/components/FileUpload.vue";
import SearchForm from "@/components/SearchForm.vue";
import { ref } from "vue";
import EuropaDataService from "@/api/europaDataService";
import SearchResultsList from "@/components/SearchResultsList.vue";

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
  return `${minLat},${minLon},${maxLat},${maxLon}`;
}


export default {
  components: {
    SearchResultsList,
    MapContainer,
    FileUpload,
    SearchForm,
  },
  setup() {
    const geojson = ref(null);
    const searchResults = ref(null);

    const handleUpload = async (data) => {
      geojson.value = data;
    };

    const searchApi = async (query) => {
      const bbox = geojson.value ? calculateMinMaxCoordinates(geojson.value) : '0,0,0,0';
      try {
        const { elements } = await EuropaDataService.search(query, bbox);
        searchResults.value = elements;
      } catch (error) {
        console.error(error);
      }
    }

    return {
      geojson,
      handleUpload,
      searchApi,
      searchResults,
    };
  },
};

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    flex-direction: column;
    height: 100vh;
    width: 40vw;
    padding: 2rem;
  }
}
</style>
