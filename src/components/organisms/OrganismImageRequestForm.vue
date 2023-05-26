<template>
    <div class="organism-image-request-form__wrapper">
        <p class="organism-image-request-form__header">Send a request to Sentinel Hub WMS service to get imagery for the selected area</p>
        <form class="organism-image-request-form__form" @submit.prevent="handleSubmit">
            <select id="layer" name="layer" v-model="requestParams.layer">
                <option disabled value="">Select the layer...</option>
                <option v-for="layer in layerOptions" :key="layer" :value="layer">{{layer}}</option>
            </select>
            <div v-if="v$.requestParams.layer.$error">
                <span class="organism-image-request-form__error">{{v$.requestParams.layer.$errors[0].$message}}</span>
            </div>
            <div class="organism-image-request-form__input">
              <label for="cloudCoverage">Max. Cloud Coverage (%):</label>
              <input id="cloudCoverage" type="number" v-model="requestParams.cloudCoverage" placeholder="e.g. 15"/>
            </div>
            <div v-if="v$.requestParams.cloudCoverage.$error">
              <span class="organism-image-request-form__error">{{v$.requestParams.cloudCoverage.$errors[0].$message}}</span>
            </div>
            <template class="organism-image-request-form__two-cols">
              <div class="organism-image-request-form__input">
                <label for="startDate">Start Date:</label>
                <input id="startDate" type="date" v-model="requestParams.startDate"/>
              </div>
              <div class="organism-image-request-form__input">
                <label for="endDate">End Date:</label>
                <input id="endDate" type="date" v-model="requestParams.endDate"/>
              </div>
            </template>
            <div v-if="v$.requestParams.startDate.$error">
              <span class="organism-image-request-form__error">{{v$.requestParams.startDate.$errors[0].$message}}</span>
            </div>
            <div v-if="v$.requestParams.endDate.$error">
              <span class="organism-image-request-form__error">{{v$.requestParams.endDate.$errors[0].$message}}</span>
            </div>
            <template class="organism-image-request-form__two-cols">
              <div class="organism-image-request-form__input">
                <label for="width">Width (px)</label>
                <input id="width" type="number" v-model="requestParams.width"/>
              </div>
              <div class="organism-image-request-form__input">
                <label for="height">Height (px)</label>
                <input id="height" type="number" v-model="requestParams.height"/>
              </div>
            </template>
            <div v-if="v$.requestParams.width.$error">
              <span class="organism-image-request-form__error">{{v$.requestParams.width.$errors[0].$message}}</span>
            </div>
            <div v-if="v$.requestParams.height.$error">
              <span class="organism-image-request-form__error">{{v$.requestParams.height.$errors[0].$message}}</span>
            </div>
            <AtomButton type="submit" btn-class="button-blue">
              <AtomSpinner v-if="loading"/>
              <span v-else>Request</span>
            </AtomButton>
        </form>
    </div>
</template>
<script>
// TODO: create an Input component
// TODO: create a Button component
import { ImageLayerOptions } from "@/enums/ImageLayerOptions";
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, between } from '@vuelidate/validators';
import AtomSpinner from "@/components/atoms/AtomSpinner.vue";
import AtomButton from "@/components/atoms/AtomButton.vue";

export default {
    name: 'OrganismImageRequestForm',
    components: {
      AtomSpinner,
      AtomButton,
    },
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
        return {
          layerOptions: ImageLayerOptions,
          requestParams: {
              layer: '',
              cloudCoverage: null,
              startDate: '2022-01-01',
              endDate: '2023-05-01',
              width: 300,
              height: 300,
          },
        }
    },
    validations() {
      return {
        requestParams: {
          layer: {
            required: helpers.withMessage('Please select a layer', required)
          },
          cloudCoverage: {
            required: helpers.withMessage('Please enter a value between 0 and 100', required),
            between: helpers.withMessage('Please enter a value between 0 and 100', between(0, 100))
          },
          startDate: {
            required: helpers.withMessage('Please enter a start date', required),
          },
          endDate: {
            required: helpers.withMessage('Please enter an end date', required),
          },
          width: {
            required: helpers.withMessage('Please enter a width', required),
          },
          height: {
            required: helpers.withMessage('Please enter a height', required),
          },
        },
      }
    },
    inject: {
      loading: {
        from: 'loading'
      }
    },
    methods: {
      handleSubmit() {
        this.v$.$validate()
        this.$emit('submit-request', this.requestParams)
      },
    },
}
</script>
<style scoped>
.organism-image-request-form__wrapper {
  width: 100%;
}
.organism-image-request-form__header {
  margin-bottom: 1rem;
}
.organism-image-request-form__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  height: 100%;
}
.organism-image-request-form__input input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  font-size: 1rem;
  margin-top: 0.5rem;
}
@media (min-width: 1024px) {
  .organism-image-request-form__input input, select {
    padding: 0.5rem 1rem;
  }
}
select:focus {
  outline: 3px solid var(--color-outline);
}
.organism-image-request-form__input input:focus {
  outline: 3px solid var(--color-outline);
}
.organism-image-request-form__two-cols {
  display: flex;
  gap: 0.5rem;
}
.organism-image-request-form__error {
  color: yellow;
  font-size: 0.75rem;
}
</style>