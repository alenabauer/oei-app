<template>
  <div class="file-upload__wrapper">
    <h3 class="file_upload__header">Upload your geojson file:</h3>
    <!--  TODO: improve validation of the file extension -->
    <input class="file-upload__input" accept=".geojson" type="file" @change="handleFileUpload"/>
    <div v-if="error">
      <span class="file-upload__error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
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


<style scoped>
.file-upload__wrapper {
  padding: 2rem;
}
.file_upload__header {
  margin-bottom: 1rem;
}
.file-upload__error {
  color: var(--color-red);
}
</style>