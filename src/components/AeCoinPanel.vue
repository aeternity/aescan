<template>
  <app-panel class="ae-coin-panel">
    <table>
      <tbody>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenSymbol }}
            </hint-tooltip>
            Symbol
          </th>
          <td>
            <div class="ae-coin-panel__link">
              <img
                alt="æ token"
                src="@/assets/ae-token.svg">
              <copy-chip label="AE"/>
            </div>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Price
          </th>
          <td>
            {{ price }}
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Total Supply
          </th>
          <td>
            {{ formatNullable(formatAePrice(MAX_AE_DISTRIBUTION), 0) }}
          <!--            todo rename token-->
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Circulating Supply
          </th>
          <td>
            {{ formatNullable(formatAePrice(totalTokenSupply), 0) }}
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Decimals
          </th>
          <td>
            18
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMarketStatsStore } from '@/stores/marketStats'
import { formatAePrice, formatNullable, formatNumber } from '@/utils/format'
import { tokensHints } from '@/utils/hints/tokensHints'
import { useBlockchainStatsStore } from '~/stores/blockchainStats'
import { MAX_AE_DISTRIBUTION } from '~/utils/constants'

const config = useRuntimeConfig().public
const { price } = storeToRefs(useMarketStatsStore())
const { fetchMarketStats } = useMarketStatsStore()
const { totalTokenSupply } = storeToRefs(useBlockchainStatsStore())
const { fetchTotalStats } = useBlockchainStatsStore()

await useAsyncData(() => Promise.all([
  fetchTotalStats(),
  fetchMarketStats(),
]))

const props = defineProps({
  tokenDetails: {
    type: Object,
    required: true,
  },
})

const tokenMiddlewareUrl = computed(() =>
  `${config.MIDDLEWARE_URL}/v2/aex9/${props.tokenDetails.contractId}`,
)

const tokenDexUrl = computed(() =>
  props.tokenDetails.price
    ? `${config.DEX_BACKEND_URL}/tokens/by-address/${props.tokenDetails.contractId}`
    : null,
)

const fiatPrice = computed(() =>
  props.tokenDetails.price && price.value
    ? `$${formatNumber(price.value * props.tokenDetails.price, null, null, 7)}`
    : '---',
)
</script>

<style scoped>
.ae-coin-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);

    @media (--desktop) {
      gap: 0 var(--space-1);
    }
  }

  &__icon {
    margin-right: var(--space-1);
    width: 28px;
    height: 28px;

    @media (--desktop) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
