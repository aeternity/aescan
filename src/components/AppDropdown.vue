<template>
  <VMenu placement="bottom">
       <span>
    <slot/>
    </span>

    <template #popper>
      <slot name="menu"/>
    </template>
  </VMenu>
</template>

<script setup>

</script>

<style>
.v-popper__popper.v-popper--theme-menu .v-popper__inner {
  margin: 0 var(--space-2);
  color: var(--color-midnight);
  padding: var(--space-2) var(--space-1);
}
}

</style>
