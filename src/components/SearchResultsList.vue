<template>
  <ul>
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