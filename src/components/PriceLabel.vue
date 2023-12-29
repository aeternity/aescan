<template>
  <div class="price-label">
    <token-symbol-icon
      class="icon"
      contract-id="ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa"/>
    {{ formatNullable(formatAePrice(price, maxDigits)) }}
  </div>
</template>

<!--todo close to zero-->
<!--todo format nullable-->
<!--todo check wraps-->
<!--todo has icon -->

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
})
</script>

<style scoped>
.price-label {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: var(--space-1);
}
</style>
