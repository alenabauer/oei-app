<template>
  <div class="atom_logo">
    <img alt="OEI logo" class="atom_logo__image" src="../../assets/logo.png" width="75" height="75" />
    <div class="atom_logo__text">
      <span>Orbital</span>
      <span>Edge</span>
      <span>Imaging</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AtomLogo',
}
</script>
<style scoped>
.atom_logo {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  border: 1px solid var(--color-blue-light);
  height: fit-content;
}
.atom_logo__image {
  padding: 0.5rem;
  height: 100%;
  background-color: rgba(var(--color-blue-light-rgb), 0.6);
}
.atom_logo__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: transparent;
}
.atom_logo__text span {
  font-weight: 600;
}
</style>