<template>
  <div class="number-label">
    <app-tooltip v-if="formattedNumber.hasTooltip">
      <span>
        {{ formattedNumber.displayNumber }} {{ props.isPercentage ? '%' : '' }}
      </span>

      <template #tooltip>
        {{ formattedNumber.tooltipNumber }} {{ props.isPercentage ? '%' : '' }}
      </template>
    </app-tooltip>

    <template v-else>
      {{ formattedNumber.displayNumber }} {{ props.isPercentage ? '%' : '' }}
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
  isPercentage: {
    type: Boolean,
    default: false,
  },
  // todo rename props
})
const formattedNumber = computed(() =>
  formatNumber(props.number, props.roundingIndex, props.zeroingIndex, props.hasFullPrecision))
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
