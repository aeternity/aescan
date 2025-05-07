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

    <app-tooltip v-if="aaa.hasTooltip">
      {{ currencyPrefix }} {{ aaa.displayNumber }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currencySuffix }}
      </app-link>
      <template v-else>
        {{ currencySuffix }}
      </template>

      <template #tooltip>
        {{ currencyPrefix }} {{ aaa.tooltipNumber }} {{ currencySuffix }}
      </template>
    </app-tooltip>

    <template v-else>
      {{ currencyPrefix }} {{ aaa.displayNumber }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        &nbsp;{{ currencySuffix }}
      </app-link>
      <template v-else>
        {{ currencySuffix }}
      </template>
    </template>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const props = defineProps({
  price: {
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
  currency: {
    type: String,
    default: () => storeToRefs(useConfigStore()).currency.value.symbol,
  },
  contractId: {
    type: String,
    default: () => useRuntimeConfig().public.AE_TOKEN_ID,
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

// const { displayNumber, tooltipNumber, hasTooltip } = formatNumber2(props.price, props.roundingIndex, props.hasFullPrecision)
const aaa = computed(() => formatNumber(props.price, props.roundingIndex, props.zeroingIndex, props.hasFullPrecision))
// console.log('displayNumber', displayNumber)
const currencyPrefix = props.currency === '$' ? props.currency : null
const currencySuffix = props.currency === '$' ? null : props.currency

const hasIcon = props.hasIcon && props.currency !== '$'
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
