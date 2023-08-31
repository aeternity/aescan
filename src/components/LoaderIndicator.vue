<template>
  <div class="loader-indicator">
    <img
      class="loader-indicator__image"
      alt="loading"
      src="@/assets/loader.svg"
      height="47">
    <div>Loading</div>
  </div>
</template>

<style scoped>

.loader-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-monospaced);

  &__image {
    margin-bottom: var(--space-2);
  }
}
</style>
