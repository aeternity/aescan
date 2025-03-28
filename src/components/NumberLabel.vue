<template>
  <div class="price-label">
    <app-tooltip>
      {{ isRaw ? numeral(props.price).format('0,0.[0000000000000]') : `~${priceFormatted}` }}
      <template #tooltip>
        {{ props.price < 1000 ? props.price : formatNumber(props.price) }}
      </template>
    </app-tooltip>
  </div>
</template>

<!--todo dont show tooltip when raw v-if="isRaw || !isPriceRounded"-->
<!--todo wire maxDigits-->
<!-- todo reuse formatnumber in formatprice-->
<script setup>
import numeral from 'numeral'

const props = defineProps({
  price: {
    type: [String, Number],
    default: null,
  },
  maxDigits: {
    type: Number,
    default: undefined,
  },
  isRaw: {
    type: Boolean,
    default: false,
  },

})

const priceFormatted = computed(() =>
  formatNullable(formatPrice(props.price, props.maxDigits, props.isRaw)),
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
