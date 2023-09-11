<template>
  <div>
    <button @click="handle(1)">
      <app-chip
        variant="primary"
        size="sm">
        1H
      </app-chip>
    </button>
    <button @click="handle(1)">
      <app-chip
        variant="primary"
        size="sm">
        1D
      </app-chip>
    </button>
    <button @click="handle(7)">
      <app-chip
        variant="primary"
        size="sm">
        1W
      </app-chip>
    </button>
    <button>
      <app-chip
        variant="primary"
        size="sm"
        @click="handle(30)">
        1M
      </app-chip>
    </button>
    <button>
      <app-chip
        variant="primary"
        size="sm"
        @click="handle(100)">
        1Y
      </app-chip>
    </button>
    <button
      class="b"
      @click="handle(100)">
      <app-chip
        variant="primary"
        size="sm">
        CUSTOM
      </app-chip>
    </button>
  </div>
</template>
<script setup>

function handle(value) {
  console.log('handle', value)
  emit('clicked', value)
}

const emit = defineEmits(['clicked'])
</script>

<style scoped>

div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 50px;
}

button {
  grid-column: span 1;
}

.b {
  grid-column: span 5;
}

@media (--desktop) {
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  button {
    grid-column: span 1;
  }

  .b {
    grid-column: span 1;
  }
}

</style>
