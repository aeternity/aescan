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
  width: 40px;
  height: 40px;
  background: var(--bg-elev2);
  border: 1px solid var(--border);
  border-radius: 11px;
  color: var(--text);

  /* Stat/section icons ship with hardcoded light fills (white / #F7F7F7) from the
     legacy always-dark badge. Remap any solid fill to currentColor so they adapt to
     the themed icon-box; fill="none" (hollow parts) is preserved. */
  :deep(*[fill]:not([fill='none'])) {
    fill: currentcolor;
  }
}
</style>
