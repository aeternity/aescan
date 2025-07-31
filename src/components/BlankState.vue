<template>
  <div class="blank-state">
    <slot>There is no data available</slot>
  </div>
</template>

<style scoped>
.blank-state {
  font-family: var(--font-monospaced);
  text-align: center;
  padding: var(--space-2);
  color: var(--color-midnight);
  background: var(--color-snow);
}
</style>
