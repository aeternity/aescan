<template>
  <div class="transactions-chart-controls">
    <app-butt
      v-for="(button, index) in buttons"
      :key="index"
      :variant="selected === index ? 'error' : 'secondary'"
      @click="select(index)">
      {{ button.label }}
    </app-butt>
  </div>
</template>

<script setup>

const buttons = [
  { slug: '?limit=7&interval_by=day', label: '1W' },
  { slug: '?limit=30&interval_by=day', label: '1M' },
  { slug: '?limit=90&interval_by=day', label: '3M' },
  { slug: '?limit=12&interval_by=month', label: '1Y' },
  { slug: '?limit=100&interval_by=month', label: 'ALL' },
]

const selected = ref(0)

function select(value) {
  selected.value = value
  emit('selected', buttons[value].slug)
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
