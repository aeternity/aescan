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
        {{ currency }}
      </app-link>
      <template v-else>
        {{ currency }}
      </template>
      <template #tooltip>
        {{ price }} {{ currency }}
      </template>
    </app-tooltip>

    <span v-else>
      {{ price }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currency }}
      </app-link>
      <template v-else>{{ currency }}</template>
    </span>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { formatNullable } from '@/utils/format'
import { useConfigStore } from '@/stores/config'

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
    default: () => storeToRefs(useConfigStore()).currency.value.symbol,
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
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 20px;

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }
}
</style>
