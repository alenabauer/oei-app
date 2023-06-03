<template>
  <div class="file-upload">
    <input class="file-upload__input" id="file-upload__input" accept=".geojson" type="file" @change="handleFileUpload"/>
    <label for="file-upload__input">
      <font-awesome-icon icon="fa-solid fa-upload" />
      {{ fileName || 'Upload a GeoJSON file...' }}
    </label>
    <div v-if="error">
      <span class="file-upload__error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import booleanValid from '@turf/boolean-valid'
export default {
  name: 'MoleculeFileUploader',
  data() {
    return {
      error: null,
      fileName: null,
      geojson: null,
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result)
          this.processData(data, file.name)
        } catch (e) {
          this.error = e.message
        }
      }
      reader.readAsText(file)
    },
    processData(data, fileName) {
      this.geojson = data.type === 'FeatureCollection' ? data.features?.[0] : data

      if (this.geojson && this.isGeoJSONValid(this.geojson)) {
        this.$emit('data-upload', this.geojson)
      } else {
        this.error = 'Error: Invalid GeoJSON format'
        return
      }

      this.fileName = fileName
      this.error = null;
    },
    isGeoJSONValid(geojson) {
      try {
        return booleanValid(geojson)
      } catch (e) {
        console.error('Error validating GeoJSON', e)
        return false
      }
    }
  }
}
</script>

<!-- custom style was added to the file input following this tutorial: https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ -->
<style lang="scss" scoped>
.file-upload {
  padding: 1.5rem 0;
  width: 100%;

  &__input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    & + label {
      background-color: rgba(var(--color-red-rgb), 1);
      display: inline-block;
      padding: 1rem;
      width: 100%;
      text-align: center;
      transition: all .3s;
      color: var(--vt-c-white);
    }

    & + label:hover {
      background-color: rgba(var(--color-red-rgb), 0.85);
      cursor: pointer;
    }

    &:focus + label {
      outline: 3px solid var(--color-outline);
    }
  }

  &__error {
    color: var(--color-red);
  }
}
</style>