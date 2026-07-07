<template>
  <div class="loader-indicator">
    <img
      class="loader-indicator__image"
      alt="loading"
      src="@/assets/loader.svg"
      height="47">
    <div>{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Loading',
  },
})
</script>

<style scoped>
.loader-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;

  &__image {
    margin-bottom: var(--space-2);
  }
}
</style>
