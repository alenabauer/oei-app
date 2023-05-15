<template>
  <li>
    {{ searchResult.tags?.name }}
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