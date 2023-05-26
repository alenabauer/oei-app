<template>
  <font-awesome-icon class="spinner" icon="fa-solid fa-spinner"/>
</template>
<script>
export default {
  name: "AtomSpinner",
};
</script>
<style scoped>
.spinner {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>