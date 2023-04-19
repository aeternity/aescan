<template>
  <h1 class="subtitle">
    <slot/>
  </h1>
</template>
<script>
export default {
  name: 'AppSubtitle',
}
</script>

<style scoped>
.subtitle {
  color: var(--color-midnight);
  margin-bottom: var(--space-3);
}
</style>
