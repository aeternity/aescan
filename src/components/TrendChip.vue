<template>
  <app-chip
    :variant="priceChipVariant">
    {{ priceChangeSign }}{{ formatNullable(delta) }} %
  </app-chip>
</template>
<script setup>
const props = defineProps({
  delta: {
    type: Number,
    required: true,
  },
})

const priceChangeSign = computed(() => {
  return props.delta > 0 ? '+' : ''
})
const priceChipVariant = computed(() => props.delta > 0 ? 'success' : 'error')
</script>
