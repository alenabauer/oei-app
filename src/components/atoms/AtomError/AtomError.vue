<template>
  <span class="error">{{ errorMessage }}</span>
</template>
<script>
export default {
  name: "AtomError",
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  }
};
</script>
<style scoped>
.error {
  color: yellow;
  font-size: 0.75rem;
}
</style>