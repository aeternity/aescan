<template>
  <div class="price-label">
    <app-tooltip v-if="hasTooltip">
      <span>
        {{ displayNumber }}
      </span>

      <template #tooltip>
        {{ tooltipNumber }}
      </template>
    </app-tooltip>

    <template v-else>
      {{ priceFullPrecision }}
    </template>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import numeral from 'numeral'

const props = defineProps({
  number: {
    type: [String, Number],
    default: null,
  },
  currency: {
    type: String,
    default: () => storeToRefs(useConfigStore()).currency.value.symbol,
  },
  contractId: {
    type: String,
    default: () => useRuntimeConfig().public.AE_TOKEN_ID,
  },
  hasFullPrecision: {
    type: Boolean,
    default: false,
  },
  maxDigits: {
    type: Number,
    default: undefined,
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
  hasLink: {
    type: Boolean,
    default: false,
  },
})
const ABBREVIATION_THRESHOLD = 1000

const tooltipNumber = computed(() => props.number < ABBREVIATION_THRESHOLD ? props.number : priceFormatted.value)
const priceFullPrecision = computed(() => props.number > 1 ? props.number : priceFractioned.value)
const displayNumber = computed(() => `${isNumberRounded.value ? '~' : ''}${props.number > 1 ? priceAbbreviated.value : priceFractioned.value}`)

const decimalPlaces = computed(() => {
  const decimalIndex = props.number.toString().indexOf('.')
  return decimalIndex >= 0 ? props.number.toString().length - decimalIndex - 1 : 0
})
const priceAbbreviated = computed(() => formatNumber(props.number, props.maxDigits, props.hasFullPrecision))
const priceFormatted = computed(() => formatNumber(props.number, 13, true))
const priceFractioned = computed(() => {
  const maximumSignificantDigits = 8
  return Intl.NumberFormat('en-US', { maximumSignificantDigits }).format(props.number)
})

// todo ~0
// todo reuse format function
// todo unify logix
const isNumberRounded = computed(() => {
  const zeros = '0'.repeat(decimalPlaces.value)
  return props.number.toString() !== numeral(priceAbbreviated.value).format(`0.[${zeros}]`).toString() && props.number > 1
})
const isNumberAbbreviated = computed(() => /[a-z]/i.test(priceAbbreviated.value))/* when has letters */

const hasTooltip = computed(() => (isNumberAbbreviated.value || isNumberRounded.value) && !props.hasFullPrecision)
</script>

<style scoped>
.price-label {
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
