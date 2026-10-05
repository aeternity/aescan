<template>
  <div class="blank-state">
    <slot>There is no data available</slot>
  </div>
</template>

<style scoped>
.blank-state {
  text-align: center;
  padding: var(--space-2);
  color: var(--color-midnight);
  background: var(--color-surface);
}
</style>
