<template>
  <app-panel class="loader-panel">
    <loader-indicator class="loader-panel__loader-indicator"/>
  </app-panel>
</template>

<style scoped>
.loader-panel {
  display: flex;
  justify-content: center;
  padding: var(--space-4);

  &__loader-indicator {
    margin: var(--space-3) 0;
  }
}
</style>
