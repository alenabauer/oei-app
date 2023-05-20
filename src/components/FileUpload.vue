<template>
  <div class="file-upload__wrapper">
    <!--  TODO: improve validation of the file extension -->
    <input id="file-upload__input" accept=".geojson" type="file" @change="handleFileUpload"/>
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
export default {
  data() {
    return {
      error: null,
      fileName: null
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.fileName = file.name
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result)
          if (data.type == 'FeatureCollection') {
            this.$emit('data-upload', data.features?.[0])
          } else if (data.type == 'Feature') {
            this.$emit('data-upload', data)
          }
          this.error = null
        //   TODO: test different geojson files
        } catch (e) {
          this.error = 'Error: Invalid format'
        }
      }
      reader.readAsText(file)
    }
  }
}
</script>

<!-- custom style was added to the file input following this tutorial: https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ -->
<style scoped>
.file-upload__wrapper {
  padding: 2rem 0;
  width: 100%;
}
#file-upload__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#file-upload__input + label {
  background-color: rgba(var(--color-red-rgb), 1);
  display: inline-block;
  padding: 1rem;
  width: 100%;
  text-align: center;
  transition: all .3s;
}
#file-upload__input:focus + label,
#file-upload__input + label:hover {
  background-color: rgba(var(--color-red-rgb), 0.75);
  cursor: pointer;
}
#file-upload__input:focus + label {
  outline: 2px solid var(--color-blue-light);
}
.file-upload__error {
  color: var(--color-red);
}
</style>