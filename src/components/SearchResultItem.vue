<template>
  <li class="search_result_item">
    <div
        class="search_result_item__preview"
        @click="toggleExpanded()"
    >
      <span>{{ searchResult.tags?.name }}</span>
      <template v-if="hasInfo()">
        <font-awesome-icon v-if="expanded" icon="fa-solid fa-chevron-up" />
        <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
      </template>
    </div>
    <div
        class="search_result_item__details"
        v-if="expanded && hasInfo()"
    >
      <span v-if="hasAddress()">
        <font-awesome-icon icon="fa-solid fa-location-dot" />
        {{searchResult.tags["addr:street"]}}
        {{searchResult.tags["addr:housenumber"]}},
        {{searchResult.tags["addr:postcode"]}}
        {{searchResult.tags["addr:city"]}}
      </span>
      <span v-if="phone"><font-awesome-icon icon="fa-solid fa-phone" />{{phone}}</span>
      <span v-if="email"><font-awesome-icon icon="fa-solid fa-envelope" />{{email}}</span>
      <span v-if="website">
        <font-awesome-icon icon="fa-solid fa-globe" />
        <a :href="website" target="_blank">{{website}}</a>
      </span>
    </div>
  </li>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "SearchResultItem",
  components: {FontAwesomeIcon},
  props: {
    searchResult: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    expanded: false,
  }),
  methods: {
    hasAddress() {
      return (
        this.searchResult.tags["addr:street"] &&
        this.searchResult.tags["addr:housenumber"] &&
        this.searchResult.tags["addr:postcode"] &&
        this.searchResult.tags["addr:city"]
      );
    },
    hasInfo() {
      return (
        this.searchResult.tags["contact:phone"] ||
        this.searchResult.tags["contact:email"] ||
        this.searchResult.tags["website"] ||
        this.hasAddress()
      );
    },
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
  },
  computed: {
    website() {
      return this.searchResult.tags["website"];
    },
    phone() {
      return this.searchResult.tags["contact:phone"];
    },
    email() {
      return this.searchResult.tags["contact:email"];
    }
  },
};
</script>
<style scoped>
  .search_result_item__preview, .search_result_item__details {
    background-color: var(--color-blue);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
  }
  .search_result_item__preview:hover {
    cursor: pointer;
  }
  .search_result_item__details {
    flex-direction: column;
  }
  .search_result_item__details span {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>