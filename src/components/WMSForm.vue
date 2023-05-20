<template>
    <div class="wms-form__wrapper">
        <p class="wms-form__header">Send a request to Sentinel Hub WMS service to get imagery for the selected area</p>
        <form class="wms-form__form" @submit.prevent="handleSubmit">
            <select class="wms-form__input" id="layer" name="layer" v-model="requestParams.layer" required>
                <option disabled value="">Select the layer...</option>
                <option v-for="layer in layerOptions" :key="layer" :value="layer">{{layer}}</option>
            </select>
            <div class="wms-form__input">
              <label for="cloudCoverage">Max. Cloud Coverage:</label>
              <input id="cloudCoverage" type="number" v-model="requestParams.cloudCoverage" required/>
            </div>
            <div class="wms-form__input">
              <label for="startDate">Start Date:</label>
              <input id="startDate" type="date" v-model="requestParams.startDate" required/>
            </div>
            <div class="wms-form__input">
              <label for="endDate">End Date:</label>
              <input id="endDate" type="date" v-model="requestParams.endDate" required/>
            </div>
            <div class="wms-form__button">
                <button type="submit">Request</button>
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
              layer: '',
              cloudCoverage: null,
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
.wms-form__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  height: 100%;
}
.wms-form__input {
  width: 100%;
  min-height: 2.5rem;
}
.wms-form__input:focus {
  outline: 3px solid var(--color-outline);
}
.wms-form__input input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 1rem;
  margin-top: 0.5rem;
}
.wms-form__input input:focus {
  outline: 3px solid var(--color-outline);
}
.wms-form__button button {
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid var(--color-blue-light);
  background-color: rgba(var(--color-blue-light-rgb), 1);
  color: var(--vt-c-white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
}
.wms-form__button button:hover {
  background-color: rgba(var(--color-blue-light-rgb), 0.75);
  border: 1px solid var(--color-blue-light);
}
.wms-form__button button:focus {
  outline: 3px solid var(--color-outline);
}
</style>