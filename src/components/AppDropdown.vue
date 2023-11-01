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

<script setup>

</script>

<style>
.v-popper {
  display: inline-block;

  &__popper {
    &.v-popper--theme-tooltip {
      .v-popper__inner {
        margin: 0 var(--space-2);
        padding: var(--space-3);
        background: var(--color-midnight);
        color: var(--color-white);
        border: none;
        word-break: break-word;
        /* stylelint-disable  max-nesting-depth  */
        /* as it is 3rd party component */
        @media (--desktop) {
          word-break: normal;
        }
      }
    }
  }
}

</style>
