<template>
  <div class="number-label">
    <app-tooltip v-if="formattedNumber.hasTooltip">
      <span>
        {{ formattedNumber.displayNumber }}
      </span>

      <template #tooltip>
        {{ formattedNumber.tooltipNumber }}
      </template>
    </app-tooltip>

    <template v-else>
      {{ formattedNumber.displayNumber }}
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  number: {
    type: [String, Number],
    default: null,
  },
  hasFullPrecision: {
    type: Boolean,
    default: undefined,
  },
  roundingIndex: {
    type: Number,
    default: undefined,
  },
  zeroingIndex: {
    type: Number,
    default: undefined,
  },
  // todo rename props
})
console.log('props.price', props.price)
const formattedNumber = computed(() => formatNumber(props.number, props.roundingIndex, props.zeroingIndex, props.hasFullPrecision))
console.log('formattedNumber', formattedNumber.value)
</script>

<style scoped>
.number-label {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__icon {
    max-width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }
}
</style>
