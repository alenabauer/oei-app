<template>
  <img v-if="imgSrc" :src="imgSrc" alt="Sentinel Hub WMS Image" />
</template>
<script>
export default {
  name: "WMSImage",
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped>
</style>