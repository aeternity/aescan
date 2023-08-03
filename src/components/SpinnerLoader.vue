<template>
  <div class="spinner-loader">
    <img
      class="spinner-loader__image"
      alt="loading"
      src="@/assets/loader.gif"
      height="47">
    <div>Loading</div>
  </div>
</template>

<style scoped>

.spinner-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-monospaced);

  &__image {
    margin-bottom: var(--space-2);
  }
}
</style>
