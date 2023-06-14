<template>
  <app-tooltip
    :skidding="60"
    has-fixed-width>
    <span class="hint-tooltip__icon">
      <hint-icon/>
    </span>
    <template #tooltip>
      <slot/>
    </template>
  </app-tooltip>
</template>

<script setup>
import HintIcon from '@/components/HintIcon'
import AppTooltip from '@/components/AppTooltip'
</script>

<style scoped>
.hint-tooltip__icon {
  line-height: 0;
  display: inline-block;
  vertical-align: middle;
}
</style>
