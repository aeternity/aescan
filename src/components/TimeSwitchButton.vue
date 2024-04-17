<template>
  <app-button
    class="time-switch-button"
    variant="link"
    @click="switchTimeFormat">
    <slot/>
    {{ suffix }}
  </app-button>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const { switchTimeFormat } = useAppStore()
const { timeFormat } = storeToRefs(useAppStore())
const suffix = computed(() => {
  return timeFormat.value === 'relative' ? 'Age' : 'Time'
})
</script>

<style setup>
.time-switch-button {
  font-family: var(--font-primary);
  font-weight: 500;

  font-size: 14px;
  line-height: 22px;

  @media (--desktop) {
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
