<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @change="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'AtomInput',
  props: {
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
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
  },
}
</script>
<style scoped>
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  font-size: 1rem;
  margin-top: 0.5rem;
}
input:focus {
  outline: 3px solid var(--color-outline);
}
@media (min-width: 1024px) {
  input {
    padding: 0.5rem 1rem;
  }
}
</style>