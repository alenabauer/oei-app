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
  color: var(--color-red);
  font-size: 0.75rem;
}
</style>