<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__content__options">
        <a :href="imgSrc" download="sentinel-wms-img">
          <font-awesome-icon icon="fa-solid fa-file-arrow-down"/>
        </a>
        <font-awesome-icon @click="$emit('close')" class="modal__close" icon="fa-solid fa-xmark"/>
      </div>
      <img :src="imgSrc" alt="Sentinel Hub WMS Image" />
    </div>
  </div>
</template>
<script>
export default {
  name: "OrganismImageModal",
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
  }
};
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vw;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(2px) brightness(40%);

  @media (min-width: 1024px) {
    height: 100vh;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(var(--color-blue-light-rgb), 0.4);
    padding: 1rem 2rem 2rem;

    &__options {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 100%;
      font-size: 2rem;
      gap: 2rem;
    }
  }

  &__close {
    color: var(--color-link);
    transition: .3s;

    &:hover {
      color: white;
      cursor: pointer;
    }
  }
}
</style>