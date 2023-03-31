<template>
  <h2 class="subtitle">
    <slot/>
  </h2>
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
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.03em;
}
</style>
