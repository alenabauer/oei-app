<template>
  <header>
    <img alt="OEI logo" class="logo" src="./assets/logo.png" width="75" height="75" />

    <div class="wrapper">
      <FileUpload @data-upload="handleUpload" />
      <SearchForm @search="searchApi" />
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          {{ result.title?.en }}
        </li>
      </ul>
    </div>
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
import axios from "axios";
import EuropaDataService from "@/api/europaDataService";

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

  return {
    minLon,
    minLat,
    maxLon,
    maxLat,
  };
}


export default {
  components: {
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
      const searchParams = {
          "boundingBox": geojson.value ? calculateMinMaxCoordinates(geojson.value) : {},
      }
      try {
        const { results } = await EuropaDataService.search(query, searchParams);
        console.log('query', query)
        console.log('searchParams', searchParams)
        console.log('results', results);
        searchResults.value = results;
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
    width: 30vw;
    padding: 2rem;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
