<template>
  <select
      :id="id"
      :name="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target?.value)"
  >
    <option v-if="label" disabled value="">{{ label }}</option>
    <option v-else disabled value="">Select...</option>
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>
<script>
export default {
  name: 'AtomSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: [],
    },
  },
}
</script>
<style lang="scss" scoped>
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:focus {
    outline: 3px solid var(--color-outline);
  }

  @media (min-width: 1024px) {
    padding: 0.5rem 1rem;
  }
}
</style>