<template>
  <div>
    <div class="chart-controls__container">
      <app-chip
        v-for="(button, index) in buttons"
        :key="index"
        class="chart-controls__button"
        :variant="selectedIndex === index ? 'error' : 'secondary'"
        @click="selectInterval(index)">
        {{ button.label }}
      </app-chip>
      <range-picker
        :is-active="selectedIndex === 'custom'"
        :is-range-set="hasCustomDate"
        @updated="selectRange"/>
    </div>
  </div>
</template>

<script setup>
import RangePicker from '@/components/RangePicker'

const buttons = [
  { interval: 'day', limit: '7', label: '1W' },
  { interval: 'day', limit: '30', label: '1M' },
  { interval: 'day', limit: '90', label: '3M' },
  { interval: 'month', limit: '12', label: '1Y' },
  { interval: 'month', limit: '100', label: 'ALL' },
]

const selectedIndex = ref(0)

const hasCustomDate = computed(() => {
  return selectedIndex.value === 'custom'
})

function selectInterval(index) {
  selectedIndex.value = index
  emit('selected', buttons[index])
}

function selectRange(dateRange) {
  selectedIndex.value = 'custom'
  const range = {
    range: {
      minStart: dateRange[0].toISOString().split('T')[0],
      maxStart: dateRange[1].toISOString().split('T')[0],
    },
  }
  emit('selected', range)
}

const emit = defineEmits(['selected'])
</script>

<style scoped>
.chart-controls {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 8px;
    row-gap: 8px;

    @media (--desktop) {
      display: flex;
      gap: 8px;
      flex-grow: 1;
      flex-wrap: nowrap;
    }
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
