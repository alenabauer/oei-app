<template>
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
.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
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
  border: 1px solid var(--color-blue-dark);
}
.search-form__button button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-blue-dark);
  background-color: var(--color-blue-dark);
  color: var(--vt-c-white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: 100%;
  font-size: 1rem;
}
.search-form__button button:hover {
  background-color: var(--color-blue-light);
}
</style>