<template>
  <button :type="type" :class="btnClass">
    <slot />
  </button>
</template>
<script>
export default {
  name: "AtomButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    btnClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  padding: 1rem;
  margin-top: 1rem;
  color: var(--vt-c-white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;

  &:focus {
    outline: 3px solid var(--color-outline);
  }
}

.button-blue {
  border: 1px solid var(--color-blue-light);
  background-color: rgba(var(--color-blue-light-rgb), 1);

  &:hover {
    background-color: rgba(var(--color-blue-light-rgb), 0.75);
    border: 1px solid var(--color-blue-light);
  }
}
</style>