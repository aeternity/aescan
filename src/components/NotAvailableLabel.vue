<template>
  <app-tooltip class="not-available-label">
    N/A
    <template #tooltip>
      Value is empty
    </template>
  </app-tooltip>
</template>

<style scoped>
.not-available-label {
  display: inline-flex;
  color: var(--color-midnight-55);
  font-style: italic;
}
</style>
