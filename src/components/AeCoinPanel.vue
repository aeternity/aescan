<template>
  <app-panel class="ae-coin-panel">
    <table>
      <tbody>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.tokenSymbol }}
            </hint-tooltip>
            Symbol
          </th>
          <td>
            <div class="ae-coin-panel__link">
              <img
                class="ae-coin-panel__icon"
                alt="æ token"
                src="@/assets/ae-token.svg">
              <copy-chip label="AE"/>
            </div>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.price }}
            </hint-tooltip>
            Price
          </th>
          <td>
            $ {{ formatNullable(price) }}
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.totalSupply }}
            </hint-tooltip>
            Total Supply
          </th>
          <td>
            {{ formatNullable(formatAePrice(MAX_AE_DISTRIBUTION), 0) }}
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.circulating }}
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
              {{ aeCoinHints.decimals }}
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
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import { formatAePrice, formatNullable } from '@/utils/format'
import { aeCoinHints } from '@/utils/hints/aeCoinHints'
import { MAX_AE_DISTRIBUTION } from '@/utils/constants'

const { price } = storeToRefs(useMarketStatsStore())
const { fetchMarketStats } = useMarketStatsStore()

const { totalTokenSupply } = storeToRefs(useBlockchainStatsStore())
const { fetchTotalStats } = useBlockchainStatsStore()

await useAsyncData(() => Promise.all([
  fetchTotalStats(),
  fetchMarketStats(),
]))
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
