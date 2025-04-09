<template>
  <div class="number-label">
    <app-tooltip v-if="hasTooltip">
      {{ `${displayNumber}` }}
      <template #tooltip>
        {{ formattedRawNumber }}
      </template>
    </app-tooltip>
    <template v-else>
      {{ formattedRawNumber }}
    </template>
  </div>
</template>

<script setup>
import numeral from 'numeral'

const props = defineProps({
  number: {
    type: [String, Number],
    default: null,
  },
  maxDigits: {
    type: Number,
    default: undefined,
  },
  hasFullPrecision: {
    // todo hasFullPrecision: {
    type: Boolean,
    default: false,
  },
})

// todo dont show tilda when 6200000

const hasTooltip = computed(() => !props.hasFullPrecision && isNumberRounded.value)

const numberFormatted = computed(() =>
  formatNullable(formatNumber(props.number, props.maxDigits, props.hasFullPrecision)),
)

const formattedRawNumber = computed(() => numeral(props.number).format('0,0.[0000000000000]'))

const isNumberRounded = computed(() =>
  props.number.toString() !== numberFormatted.value,
)

const displayNumber = computed(() => {
  return `${isNumberRounded.value ? '~' : ''}${numberFormatted.value}`
})

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

<!--todo dont show tooltip when raw v-if="hasFullPrecision || !isNumberRounded"-->
<!--todo wire maxDigits-->
<!-- todo reuse formatnumber in formatprice-->
