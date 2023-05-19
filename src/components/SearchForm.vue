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
        />
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
export default {
  name: 'SearchForm',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.query)
    },
  },
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
  align-items: center;
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