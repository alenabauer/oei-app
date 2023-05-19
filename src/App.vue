<template>
  <header>
    <HeaderLogo />
    <FileUpload @data-upload="handleUpload" />
<!--    <div v-if="loading" class="search_results_list__placeholder">-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--    </div>-->
<!--    <SearchResultsList :searchResults="searchResults" />-->
  </header>

  <main>
    <MapContainer :geojson="geojson" />
  </main>
</template>

<script>
import MapContainer from "@/components/MapContainer.vue";
import FileUpload from "@/components/FileUpload.vue";
import { ref } from "vue";
import OverpassApiService from "@/api/OverpassApiService";
import SearchResultsList from "@/components/SearchResultsList.vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import PolygonsApiService from "@/api/agromonitoring/PolygonsApiService";
import SatelliteImageryApiService from "@/api/agromonitoring/SatelliteImageryApiService";

export default {
  components: {
    SearchResultsList,
    MapContainer,
    FileUpload,
    HeaderLogo,
  },
  setup() {
    const geojson = ref(null);
    const searchResults = ref(null);
    const loading = ref(false);
    const polygonId = ref(null);

    const handleUpload = async (data) => {
      geojson.value = data;

      try {
        polygonId.value = await PolygonsApiService.createPolygon(data);
      } catch (error) {
        console.error(error);
      }

      const start = new Date("April 1, 2023");
      const startUnixTime = start.getTime() / 1000
      const end = new Date("April 30, 2023");
      const endUnixTime = end.getTime() / 1000;

      try {
        await SatelliteImageryApiService.searchImages(polygonId.value, startUnixTime, endUnixTime);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      geojson,
      handleUpload,
      searchApi,
      searchResults,
      loading,
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

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
  .search_results_list__placeholder {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .search_results_list__placeholder > div {
    background-color: #ddd;
    border-radius: 0.5rem;
    height: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
