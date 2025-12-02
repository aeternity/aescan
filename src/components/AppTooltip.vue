<template>
  <VTooltip
    :triggers="['hover', 'click']"
    :popper-triggers="['hover']"
    :skidding="skidding"
    data-popper-placement="top-start"
    :delay="{show: 100, hide: 0}"
    :auto-hide="true">
    <span>
      <slot/>
    </span>

    <template #popper>
      <div :class="{'tooltip--fixed': hasFixedWidth}">
        <slot name="tooltip"/>
      </div>
    </template>
  </VTooltip>
</template>

<script setup>
defineProps({
  skidding: {
    type: Number,
    default: 0,
  },
  hasFixedWidth: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.tooltip--fixed {
  max-width: 290px;
}
</style>

<style>
.v-popper {
  display: inline-block;

  &__popper.v-popper--theme-tooltip {
    .v-popper__inner {
      margin: 0 var(--space-2);
      padding: var(--space-3);
      background: var(--color-midnight);
      color: var(--color-white);
      border: none;
      word-break: break-all;

      @media (--desktop) {
        word-break: normal;
      }
    }
  }
}
</style>
