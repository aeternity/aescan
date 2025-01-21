<template>
  <app-button
    class="time-toggle-button"
    variant="link"
    @click="toggleTimeFormat">
    <slot/>
    {{ suffix }}
  </app-button>
</template>

<script setup>
import { useUiStore } from '@/composables/ui'

const { toggleTimeFormat } = useUiStore()
const { timeFormat } = storeToRefs(useUiStore())
const suffix = computed(() => {
  return timeFormat.value === 'relative' ? 'Age' : 'Time'
})
</script>

<style setup>
.time-toggle-button {
  display: contents !important;
  font-weight: 500 !important;

  font-size: 14px !important;
  line-height: 22px !important;

  @media (--desktop) {
    font-size: 16px !important;
    line-height: 18px !important;
  }
}
</style>
