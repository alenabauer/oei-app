<template>
    <div class="search-form__wrapper">
        <h3 class="search-form__header">Request an image</h3>
        <form class="search-form__form" @submit.prevent="handleSubmit">
            <div class="search-form__input">
                <label for="layer">Select the layer:</label>
                <select id="layer" name="layer" v-model="requestParams.layer">
                    <option v-for="layer in layerOptions" :key="layer" :value="layer">{{layer}}</option>
                </select>
            </div>
            <div class="search-form__input">
              <label for="cloudCoverage">Max. Cloud Coverage:</label>
              <input id="cloudCoverage" type="number" v-model="requestParams.cloudCoverage" />
            </div>
            <div class="search-form__button">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
    name: 'SearchForm',
    data() {
        return {
          layerOptions: [
              'AGRICULTURE',
              'BATHYMETRIC',
              'FALSE-COLOR-URBAN',
              'FALSE-COLOR',
              'GEOLOGY',
              'MOISTURE-INDEX',
              'NATURAL-COLOR',
              'NDVI',
              'SWIR',
              'TRUE-COLOR-S2L2A',
          ],
          requestParams: {
              layer: 'AGRICULTURE',
              cloudCoverage: 0,
          },
        }
    },
    methods: {
      handleSubmit() {
        this.$emit('search', this.requestParams)
      },
    },
    computed: {},
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