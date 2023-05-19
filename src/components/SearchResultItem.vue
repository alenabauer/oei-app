<template>
  <li>
    <div class="search_result_item">
      {{ searchResult.tags?.name }}
    </div>
  </li>
</template>
<script>
export default {
  name: "SearchResultItem",
  props: {
    searchResult: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped>
  .search_result_item {
    background-color: var(--color-blue);
    padding: 0.5rem 1rem;
  }
</style>