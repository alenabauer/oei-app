<script setup>
import MapContainer from "@/components/MapContainer.vue";
</script>

<template>
  <header>
    <img alt="OEI logo" class="logo" src="./assets/logo.png" width="125" height="125" />

    <div class="wrapper">
<!--    TODO: add a button for uploading geojson -->
    </div>
  </header>

  <main>
    <MapContainer />
  </main>
</template>

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
    width: 25vw;
    padding: 2rem;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
