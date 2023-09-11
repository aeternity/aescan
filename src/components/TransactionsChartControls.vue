<template>
  <div class="transactions-chart-controls">
    <button @click="handle(1)">
      <app-chip
        variant="secondary">
        1H
      </app-chip>
    </button>
    <button @click="handle(2)">
      <app-chip
        variant="error">
        1D
      </app-chip>
    </button>
    <button @click="handle(7)">
      <app-chip
        variant="primary">
        1W
      </app-chip>
    </button>
    <button>
      <app-chip
        variant="secondary"
        @click="handle(30)">
        1M
      </app-chip>
    </button>
    <button>
      <app-chip
        variant="secondary"
        @click="handle(100)">
        1Y
      </app-chip>
    </button>
  </div>
</template>
<script setup>

function handle(value) {
  emit('clicked', value)
}

const emit = defineEmits(['clicked'])
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
