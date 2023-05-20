<template>
    <div class="wms-form__wrapper">
        <h3 class="wms-form__header">Request an image</h3>
        <form class="wms-form__form" @submit.prevent="handleSubmit">
            <div class="wms-form__input">
                <label for="layer">Select the layer:</label>
                <select id="layer" name="layer" v-model="requestParams.layer">
                    <option v-for="layer in layerOptions" :key="layer" :value="layer">{{layer}}</option>
                </select>
            </div>
            <div class="wms-form__input">
              <label for="cloudCoverage">Max. Cloud Coverage:</label>
              <input id="cloudCoverage" type="number" v-model="requestParams.cloudCoverage" />
            </div>
            <div class="wms-form__input">
              <label for="startDate">Start Date:</label>
              <input id="startDate" type="date" v-model="requestParams.startDate" />
            </div>
            <div class="wms-form__input">
              <label for="endDate">End Date:</label>
              <input id="endDate" type="date" v-model="requestParams.endDate" />
            </div>
            <div class="wms-form__button">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
    name: 'WMSForm',
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
              startDate: '2022-01-01',
              endDate: '2023-05-01',
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
.wms-form__wrapper {
    width: 100%;
}
.wms-form__header {
    margin-bottom: 1rem;
}
.wms-form {
    display: flex;
    align-items: start;
    justify-content: center;
    margin-bottom: 1rem;
}
.wms-form__input {
    width: 100%;
}
.wms-form__input input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    font-size: 1rem;
}
.wms-form__input input:focus {
    outline: none;
    border: 1px solid var(--color-blue-light);
}
.wms-form__button button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-blue-light);
    background-color: var(--color-blue-light);
    color: var(--vt-c-white);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    height: 100%;
    font-size: 1rem;
}
.wms-form__button button:hover {
    background-color: var(--color-blue);
    border: 1px solid var(--color-blue);
}
</style>