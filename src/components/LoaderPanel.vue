<template>
  <app-panel class="loader-panel">
    <loader-indicator class="loader-panel_loader-indicator"/>
  </app-panel>
</template>

<style scoped>
.loader-panel {
  display: flex;
  justify-content: center;
  align-items: center;

  &__loader-indicator {
    margin: var(--space-3) 0;
  }
}
</style>
