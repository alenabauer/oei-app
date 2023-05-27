<template>
  <section id="sidebar">
    <AtomLogo />
    <MoleculeFileUploader @data-upload="handleUpload" />
    <!--    display the WMS request params form once a geojson file is uploaded -->
    <OrganismImageRequestForm
        v-if="geojson"
        @submit-request="generateImage"
    />
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
  computed: {
    bbox() {
      return this.geojson ? calculateMinMaxCoordinates(this.geojson) : null;
    },
  },
  provide: function () {
    return {
      loading: computed(() => this.loading),
      bbox: computed(() => this.bbox),
    };
  },
  methods: {
    handleUpload(data) {
      this.geojson = data;
      console.log('bbox', this.bbox)
    },
    async generateImage(params) {
      this.loading = true;
      try {
        const response = await SentinelApiService.getImage(this.bbox, params);
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
<style lang="scss" scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 1.5rem;
  right: 0;
  z-index: 10;
  background: rgba(var(--vt-c-white-rgb), 0.4);
  backdrop-filter: blur(4px);
  width: 100vw;

  @media screen and (min-width: 1024px) {
    position: absolute;
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>