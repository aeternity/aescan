<template>
  <div class="price-label">
    <app-link
      v-if="hasLink"
      :to="`/contracts/${contractId}`">
      <token-symbol-icon
        v-if="hasIcon"
        class="price-label__icon"
        :contract-id="contractId"/>
    </app-link>
    <app-tooltip v-if="isPriceRounded">
      {{ priceRounded }}
      <app-link
        v-if="hasLink"
        :to="`/contracts/${contractId}`">
        {{ currency }}
      </app-link>
      <template v-else>{{ currency }}</template>
      <template #tooltip>
        {{ price }} {{ currency }}
      </template>
    </app-tooltip>

    <span v-else>
      {{ price }}
      <app-link
        v-if="hasLink"
        :to="`/contracts/${contractId}`">
        {{ currency }}
      </app-link>
      <template v-else>{{ currency }}</template>
    </span>
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
    default: 'AE',
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
