<template>
  <div class="price-label">
    <app-tooltip>
      {{ isRaw ? numeral(props.price).format('0,0.[0000000000000]') : `~${priceFormatted}` }}
      <template #tooltip>
        {{ props.price < 1000 ? props.price : formatNum(props.price) }}
      </template>
    </app-tooltip>
  </div>
</template>

<!--todo dont show tooltip when raw v-if="isRaw || !isPriceRounded"-->
<script setup>
import { useRuntimeConfig } from 'nuxt/app'
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
  isRaw: {
    type: Boolean,
    default: false,
  },
  contractId: {
    type: String,
    default: () => useRuntimeConfig().public.AE_TOKEN_ID,
  },
})

// todo is formatted
const isPriceRounded = computed(() => {
  if (props.price) {
    return null
  }
  return props.price.toString() !== priceFormatted.value
})
// const priceRounded = computed(() => {
//   console.log('props.price', props.price)
//   const rrr = formatNullable(formatPrice(props.price, props.maxDigits))
//   console.log('rrr', rrr)
//   return rrr
// })
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
