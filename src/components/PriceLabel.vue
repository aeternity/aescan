<template>
  <div class="price-label">
    <token-symbol-icon
      v-if="hasIcon"
      class="price-label__icon"
      :contract-id="contractId"/>
    <app-tooltip v-if="isPriceRounded">
      {{ priceRounded }}
      <template #tooltip>
        {{ price }}
      </template>
    </app-tooltip>
    <template v-else>
      {{ price }}
    </template>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { formatNullable } from '@/utils/format'
import AppTooltip from '@/components/AppTooltip'

const props = defineProps({
  price: {
    type: Number,
    default: null,
  },
  maxDigits: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: undefined,
  },
  hasIcon: {
    type: Boolean,
    default: true,
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
  formatNullable(formatAePrice(props.price, props.maxDigits, props.currency)),
)
const price = computed(() =>
  formatNullable(formatAePrice(props.price, null, props.currency)),
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
