<template>
  <app-chip :variant="priceChipVariant">
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

const priceChipVariant = computed(
  () => {
    if (props.delta > 0) {
      return 'success'
    }
    if (props.delta < 0) {
      return 'error'
    }
    if (props.delta === 0) {
      return 'primary'
    }
  })
</script>
