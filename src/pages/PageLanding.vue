<template>
  <section id="section-controls">
    <AtomLogo />
    <MoleculeFileUploader @data-upload="handleUpload" />
    <!--    display the WMS request params form once a geojson file is uploaded -->
    <OrganismImageRequestForm v-if="geojson" @submit-request="generateImage" />
  </section>

  <!--    TODO: think of how to give user an access to the image when the modal is closed -->
  <OrganismImageModal v-if="imageSource && showImageModal" :img-src="imageSource" @close="showImageModal = false" />

  <OrganismMap id="section-map" :geojson="geojson" />
</template>

<script>
import AtomLogo from "@/components/atoms/AtomLogo.vue";
import MoleculeFileUploader from "@/components/molecules/MoleculeFileUploader.vue";
import OrganismMap from "@/components/organisms/OrganismMap.vue";
import OrganismImageRequestForm from "@/components/organisms/OrganismImageRequestForm.vue";
import OrganismImageModal from "@/components/organisms/OrganismImageModal.vue";
import SentinelApiService from "@/api/SentinelApiService";
import { calculateMinMaxCoordinates } from "@/helpers/helpers";
import { computed } from "vue";

export default {
  name: "PageLanding",
  components: {
    AtomLogo,
    MoleculeFileUploader,
    OrganismImageRequestForm,
    OrganismImageModal,
    OrganismMap,
  },
  data() {
    return {
      geojson: null,
      imageSource: "",
      showImageModal: false,
      loading: false,
    };
  },
  provide: function () {
    return {
      loading: computed(() => this.loading),
    };
  },
  methods: {
    handleUpload(data) {
      this.geojson = data;
    },
    async generateImage(params) {
      this.loading = true;
      const bbox = this.geojson ? calculateMinMaxCoordinates(this.geojson) : null;
      try {
        const response = await SentinelApiService.getImage(bbox, params);
        const base64ImageString = Buffer.from(response, "binary").toString("base64");
        this.imageSource = "data:image/png;base64," + base64ImageString;
        this.showImageModal = true;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
};

</script>
<style scoped>
#section-controls {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  margin: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(var(--color-blue-dark-rgb), 0.8);
  width: 100vw;
}
@media screen and (min-width: 1024px) {
  #section-controls {
    position: absolute;
    width: 400px;
    margin: 2rem;
  }
}
</style>