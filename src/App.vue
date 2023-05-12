<template>
  <header>
    <img alt="OEI logo" class="logo" src="./assets/logo.png" width="75" height="75" />

    <div class="wrapper">
      <FileUpload @data-upload="handleUpload" />
    </div>
  </header>

  <main>
    <MapContainer :geojson="geojson" />
  </main>
</template>

<script>
import MapContainer from "@/components/MapContainer.vue";
import FileUpload from "@/components/FileUpload.vue";
import { ref } from "vue";

export default {
  components: {
    MapContainer,
    FileUpload,
  },
  setup() {
    const geojson = ref(null);

    const handleUpload = (data) => {
      geojson.value = data;
    };

    return {
      geojson,
      handleUpload,
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
