<template>
  <ul class="search_results_list">
    <SearchResultItem v-for="result in searchResults" :key="result.id" :search-result="result"/>
  </ul>
</template>
<script>
import SearchResultItem from "./SearchResultItem.vue";
export default {
  name: "SearchResultsList",
  components: {
    SearchResultItem,
  },
  props: {
    searchResults: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style>
.search_results_list {
  list-style: none;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>