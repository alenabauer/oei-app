<script setup>
import MapContainer from "@/components/MapContainer.vue";

// an example geojson for testing
const geojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [
          -27.0703125,
          43.58039085560784
        ],
        [
          -28.125,
          23.563987128451217
        ],
        [
          -10.8984375,
          32.84267363195431
        ],
        [
          -27.0703125,
          43.58039085560784
        ]
      ]
    ]
  }
}

</script>

<template>
  <header>
    <img alt="OEI logo" class="logo" src="./assets/logo.png" width="75" height="75" />

    <div class="wrapper">
<!--    TODO: add a button for uploading geojson -->
    </div>
  </header>

  <main>
    <MapContainer :geojson="geojson" />
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
