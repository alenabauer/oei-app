<template>
  <select
      :id="id"
      :name="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target?.value)"
  >
    <option disabled value="">{{ label }}</option>
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
    placeholder: {
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
<style scoped>
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  font-size: 1rem;
  margin-top: 0.5rem;
}
select:focus {
  outline: 3px solid var(--color-outline);
}
@media (min-width: 1024px) {
  select {
    padding: 0.5rem 1rem;
  }
}
</style>