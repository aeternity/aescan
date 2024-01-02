<template>
  <div class="price-label">
    <token-symbol-icon
      v-if="hasIcon"
      class="icon"
      :contract-id="contractId"/>
    {{ formatNullable(formatAePrice(price, maxDigits, currency)) }}
  </div>
</template>

<!--todo find nullable + move to adapters -->
<!--todo undefined?-->

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
  contractId: {
    type: String,
    default: () => useRuntimeConfig().public.AE_TOKEN_ID,
  },
  // todo contract id rename and move to adapters
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
