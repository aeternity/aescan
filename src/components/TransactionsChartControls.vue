<template>
  <div class="transactions-chart-controls">
    <app-butt
      v-for="(button, index) in buttons"
      :key="index"
      :variant="selected === index ? 'primary' : 'secondary'"
      @click="select(index)">
      {{ button.label }}
    </app-butt>
  </div>
</template>

<script setup>

const buttons = [
  { count: 1, label: '1H' },
  { count: 2, label: '1D' },
  { count: 7, label: '1W' },
  { count: 30, label: '1M' },
  { count: 365, label: '1Y' },
]

const selected = ref(0)

function select(value) {
  selected.value = value
  emit('selected', buttons[value].count)
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
}

button {
  grid-column: span 1;
  background: transparent;
  border: 0;
  padding: 0;
  width: 30px;

  @media (--desktop) {
    grid-column: span 1;
  }
}

</style>
