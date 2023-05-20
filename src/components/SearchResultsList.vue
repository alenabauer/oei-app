<template>
<!--  <ul v-if="searchResults && searchResults.length > 0" className="search_results_list">-->
<!--    <SearchResultItem v-for="result in searchResults" :key="result.id" :search-result="result"/>-->
<!--  </ul>-->
<!--  <p v-if="searchResults && searchResults.length == 0">No results.</p>-->
  <img :src="searchResults" alt="sentinel img" />
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
      type: String,
      default: () => '',
    },
  },
};
</script>
<style>
.search_results_list {
  list-style: none;
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: scroll;
  scroll-behavior: auto;
  margin-bottom: 1rem;
}
</style>