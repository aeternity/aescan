<template>
  <div class="transactions-chart-controls">
    <app-chip
      v-for="(button, index) in buttons"
      :key="index"
      class="transactions-chart-controls__button"
      :variant="selectedIndex === index ? 'error' : 'secondary'"
      @click="select(index)">
      {{ button.label }}
    </app-chip>
  </div>
</template>

<script setup>

const buttons = [
  { interval: 'day', limit: '7', label: '1W' },
  { interval: 'day', limit: '30', label: '1M' },
  { interval: 'day', limit: '90', label: '3M' },
  { interval: 'month', limit: '12', label: '1Y' },
  { interval: 'month', limit: '100', label: 'ALL' },
]

const selectedIndex = ref(0)

function select(value) {
  selectedIndex.value = value
  emit('selected', buttons[value])
}

const emit = defineEmits(['selected'])
</script>

<style scoped>
.transactions-chart-controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 8px;

  @media (--desktop) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
