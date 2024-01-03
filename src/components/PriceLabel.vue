<template>
  <div class="price-label">
    <token-symbol-icon
      v-if="hasIcon"
      class="icon"
      :contract-id="contractId"/>
    {{ formatNullable(formatAePrice(price, maxDigits, currency)) }}
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { formatNullable } from '~/utils/format'

defineProps({
  price: {
    type: Number,
    default: null,
  },
  maxDigits: {
    type: Number,
    default: null,
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
</script>

<style scoped>
.price-label {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: var(--space-1);
}
</style>
