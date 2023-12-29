<template>
  <div class="price-label">
    <token-symbol-icon
      class="icon"
      :contract-id="contractId"/>
    {{ formatNullable(formatAePrice(price, maxDigits, currency)) }}
  </div>
</template>

<!--todo has icon -->
<!--todo alignment -->

<script setup>
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
  contractId: {
    type: String,
    default: 'ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa',
  },
  // todo better default
  // todo undefined?
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
  width: 24px;
  height: 24px;
  margin-right: var(--space-1);
}
</style>
