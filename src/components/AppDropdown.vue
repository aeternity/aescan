<template>
  <VMenu>
    <span>
      <slot/>
    </span>

    <template #popper>
      <slot name="menu"/>
    </template>
  </VMenu>
</template>

<style>
.v-popper__popper.v-popper--theme-menu .v-popper__inner {
  margin: 0 var(--space-2);
  color: var(--color-midnight);
  padding: 0 !important;
}
</style>
