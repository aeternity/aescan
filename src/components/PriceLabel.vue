<template>
  <div class="price-label">
    <template v-if="hasIcon">
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        <token-symbol-icon
          class="price-label__icon"
          :contract-id="contractId"/>
      </app-link>

      <token-symbol-icon
        v-else
        class="price-label__icon"
        :contract-id="contractId"/>
    </template>

    <app-tooltip v-if="hasTooltip">
      {{ currencyPrefix }} {{ displayPrice }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currencySuffix }}
      </app-link>
      <template v-else>
        {{ currencySuffix }}
      </template>

      <template #tooltip>
        {{ currencyPrefix }} {{ tooltipPrice }} {{ currencySuffix }}
      </template>
    </app-tooltip>

    <template v-else>
      {{ currencyPrefix }} {{ priceFullPrecision }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currencySuffix }}
      </app-link>
      <template v-else>
        {{ currencySuffix }}
      </template>
    </template>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import numeral from 'numeral'

const props = defineProps({
  price: {
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

const tooltipPrice = computed(() => props.price < ABBREVIATION_THRESHOLD ? props.price : priceFormatted.value)
const priceFullPrecision = computed(() => props.price > 1 ? props.price : priceFractioned.value)
const displayPrice = computed(() => `${isPriceRounded.value ? '~' : ''}${props.price > 1 ? priceAbbreviated.value : priceFractioned.value}`)

const decimalPlaces = computed(() => {
  const decimalIndex = props.price.toString().indexOf('.')
  return decimalIndex >= 0 ? props.price.toString().length - decimalIndex - 1 : 0
})
const priceAbbreviated = computed(() => formatNumber(props.price, props.maxDigits, props.hasFullPrecision))
const priceFormatted = computed(() => formatNumber(props.price, 13, true))
const priceFractioned = computed(() => {
  const maximumSignificantDigits = 8
  return Intl.NumberFormat('en-US', { maximumSignificantDigits }).format(props.price)
})

// todo ~0
// todo reuse format function
const isPriceRounded = computed(() => {
  const zeros = '0'.repeat(decimalPlaces.value)
  return props.price.toString() !== numeral(priceAbbreviated.value).format(`0.[${zeros}]`).toString() && props.price > 1
})
const isPriceAbbreviated = computed(() => /[a-z]/i.test(priceAbbreviated.value))/* when has letters */

const currencyPrefix = computed(() => props.currency === '$' ? props.currency : null)
const currencySuffix = computed(() => props.currency === '$' ? null : props.currency)

const hasIcon = computed(() => props.hasIcon && props.currency !== '$')
const hasTooltip = computed(() => (isPriceAbbreviated.value || isPriceRounded.value) && !props.hasFullPrecision)
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
