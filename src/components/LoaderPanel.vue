<template>
  <app-panel class="loader-panel">
    <loader-indicator class="loader-panel__loader-indicator"/>
  </app-panel>
</template>

<style scoped>
.loader-panel {
  display: flex;
  justify-content: center;
  align-items: center;

  &__loader-indicator {
    padding: var(--space-3) 0;
  }
}
</style>
