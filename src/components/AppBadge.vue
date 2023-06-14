<template>
  <div class="badge">
    <slot/>
  </div>
</template>

<style scoped>
.badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* avoid shrink with low resolutions */
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--color-midnight);
  border-radius: 8px;
  color: var(--color-white);
}
</style>
