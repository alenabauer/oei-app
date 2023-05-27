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
<style scoped>
button {
  padding: 1rem;
  margin-top: 1rem;
  color: var(--vt-c-white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
}
.button-blue {
  border: 1px solid var(--color-blue-light);
  background-color: rgba(var(--color-blue-light-rgb), 1);
}
.button-blue:hover {
  background-color: rgba(var(--color-blue-light-rgb), 0.75);
  border: 1px solid var(--color-blue-light);
}
button:focus {
  outline: 3px solid var(--color-outline);
}
</style>