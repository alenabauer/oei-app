<template>
  <div class="search-form__wrapper">
    <h3 class="search-form__header">Search the area:</h3>
    <div class="search-form">
      <div class="search-form__input">
        <input
            type="text"
            placeholder="Search"
            v-model="query"
            @keyup.enter="handleSearch"
            @keyup="handleChange"
        />
        <ul v-if="showSuggestions" class="search-form__suggestions">
          <li
              v-for="type in types.value"
              :key="type"
              @click="handleSelect(type)"
          >{{type.value}}</li>
        </ul>
      </div>
      <div class="search-form__button">
        <button @click="handleSearch">
          Go!
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import TagInfoService from "@/api/tagInfoService";

export default {
  name: 'SearchForm',
  data() {
    return {
      query: '',
      amenityTypes: [],
      showSuggestions: false
    }
  },
  methods: {
    handleSearch() {
      this.showSuggestions = false
      this.$emit('search', this.query)
    },
    handleChange() {
      this.showSuggestions = true
      TagInfoService.getValidTagValues("amenity", this.query).then((response) => {
        this.amenityTypes.value = response.data
      })
    },
    handleSelect(type) {
      this.query = type.value
      this.handleSearch()
    }
  },
  computed: {
    types() {
      return this.amenityTypes
    }
  }
}
</script>
<style scoped>
.search-form__wrapper {
  width: 100%;
}
.search-form__header {
  margin-bottom: 1rem;
}
.search-form {
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 1rem;
}
.search-form__input {
  width: 100%;
}
.search-form__input input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 1rem;
}
.search-form__input input:focus {
  outline: none;
  border: 1px solid var(--color-blue-light);
}
.search-form__suggestions {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: absolute;
  z-index: 1;
  background-color: var(--vt-c-white);
  color: var(--color-blue-dark);
  border: 1px solid var(--color-blue-dark);
  opacity: 0.9;
  padding: 0;
}
.search-form__suggestions li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.search-form__suggestions li:hover {
  opacity: 1;
  background-color: white;
}
.search-form__button button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-blue-light);
  background-color: var(--color-blue-light);
  color: var(--vt-c-white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: 100%;
  font-size: 1rem;
}
.search-form__button button:hover {
  background-color: var(--color-blue);
  border: 1px solid var(--color-blue);
}
</style>