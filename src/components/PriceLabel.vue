<template>
  <div class="price-label">
    <app-link
      v-if="hasLink"
      :to="`/tokens/${contractId}`">
      <token-symbol-icon
        v-if="hasIcon"
        class="price-label__icon"
        :contract-id="contractId"/>
    </app-link>
    <token-symbol-icon
      v-else-if="!hasLink && hasIcon"
      class="price-label__icon"
      :contract-id="contractId"/>
    <app-tooltip v-if="isPriceRounded">
      {{ priceRounded }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currencySymbol }}
      </app-link>
      <template v-else>
        {{ currencySymbol }}
      </template>
      <template #tooltip>
        {{ price }} {{ currencySymbol }}
      </template>
    </app-tooltip>

    <span v-else>
      {{ price }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currencySymbol }}
      </app-link>
      <template v-else>{{ currencySymbol }}</template>
    </span>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const props = defineProps({
  price: {
    type: [String, Number],
    default: null,
  },
  maxDigits: {
    type: Number,
    default: undefined,
  },
  currency: {
    type: String,
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
  contractId: {
    type: String,
    default: () => useRuntimeConfig().public.AE_TOKEN_ID,
  },
})

const { currency: nativeCurrency } = storeToRefs(useConfigStore())

// the config store may not be populated yet (e.g. when the app mounts after
// recovering from an error page), so fall back reactively rather than in a
// prop default, which Vue evaluates only once
const currencySymbol = computed(() =>
  props.currency === undefined ? nativeCurrency.value?.symbol : props.currency,
)
const isPriceRounded = computed(() =>
  priceRounded.value !== price.value,
)
const priceRounded = computed(() =>
  formatNullable(formatAePrice(props.price, props.maxDigits)),
)
const price = computed(() =>
  formatNullable(formatAePrice(props.price, null)),
)
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
