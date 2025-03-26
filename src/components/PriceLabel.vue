<template>
  <div class="price-label">
    <app-link
      v-if="hasLink && currency !== '$'"
      :to="`/tokens/${contractId}`">
      <token-symbol-icon
        v-if="hasIcon"
        class="price-label__icon"
        :contract-id="contractId"/>
    </app-link>
    <token-symbol-icon
      v-else-if="!hasLink && hasIcon && currency !== '$'"
      class="price-label__icon"
      :contract-id="contractId"/>

    <span v-if="isRaw || !isPriceRounded">
      {{ currency === '$' ? currency : null }}
      {{ isRaw ? numeral(props.price).format(`0,0.[00000000]`) : priceFormatted }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currency === '$' ? null : currency }}
      </app-link>
      <template v-else>{{ currency === '$' ? null : currency }}</template>
    </span>

    <app-tooltip v-else>
      {{ currency === '$' ? currency : null }} {{ `~${priceFormatted}` }}
      <app-link
        v-if="hasLink"
        :to="`/tokens/${contractId}`">
        {{ currency === '$' ? null : currency }}
      </app-link>
      <template v-else>
        {{ currency === '$' ? null : currency }}
      </template>
      <template #tooltip>
        <!--        todo isRaw-->
        <!--        todo tooltip condition just here-->
        <!--        todo format tooltip nicely-->
        <!--        todo check sientific tokens/ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa?type=trades-->
        {{ currency === '$' ? currency : null }}
        {{ props.price < 1000 ? props.price : numeral(props.price).format(`0,0.[00000000]`) }}
        {{ currency === '$' ? null : currency }}
      </template>
    </app-tooltip>
  </div>
</template>

<!--todo handle usd-->
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
const isPriceRounded = computed(() =>
  props.price.toString() !== priceFormatted.value,
)
// const priceRounded = computed(() => {
//   console.log('props.price', props.price)
//   const rrr = formatNullable(formatAePrice(props.price, props.maxDigits))
//   console.log('rrr', rrr)
//   return rrr
// })
const priceFormatted = computed(() => {
  const ppp = props.isRaw
    ? formatNullable(formatAePrice(props.price, undefined, true))
    : formatNullable(formatAePrice(props.price, undefined, false))
  console.log('=============')

  return ppp
})
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
