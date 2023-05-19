<template>
  <div class="header_logo">
    <img alt="OEI logo" class="header_logo__image" src="../assets/logo.png" width="75" height="75" />
    <div class="header_logo__text">
      <span>Orbital</span>
      <span>Edge</span>
      <span>Imaging</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderLogo',
}
</script>
<style scoped>
.header_logo {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  background-color: var(--color-blue-light);
  border: 1px solid var(--color-blue-light);
}
.header_logo__image {
  padding-left: 0.5rem;
}
.header_logo__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-blue-dark);
  height: 100%;
  padding: 0.5rem;
}
.header_logo__text span {
  font-weight: 600;
}
</style>