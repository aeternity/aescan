<template>
  <div>
    <table
      v-for="trade in trades.data"
      :key="trade.txHash"
      class="dex-trades-table-condensed__table">
      <tbody>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Hash
            <template #tooltip>
              {{ dexTradesHints.hash }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/transactions/${trade.txHash}`"
            :hash="trade.txHash"/>
        </td>
      </tr>

      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            <time-toggle-button>Executed</time-toggle-button>
            <template #tooltip>
              {{ dexTradesHints.executed }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <block-time-cell
            :height="trade.height"
            :timestamp="trade.timestamp"/>
        </td>
      </tr>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Action
            <template #tooltip>
              {{ dexTradesHints.action }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <app-chip :variant="getChipVariant(trade.action)">
            {{ trade.action }}
          </app-chip>
        </td>
      </tr>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Token Amount (Out)
            <template #tooltip>
              {{ dexTradesHints.tokenAmountOut }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <price-label
            :contract-id="trade.fromContract"
            :currency="trade.fromToken"
            :price="trade.fromAmount"
            :max-digits="4"
            :has-link="true"/>
        </td>
      </tr>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Token Amount (In)
            <template #tooltip>
              {{ dexTradesHints.tokenAmountIn }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <price-label
            :contract-id="trade.toContract"
            :currency="trade.toToken"
            :price="trade.toAmount"
            :max-digits="4"
            :has-link="true"/>
        </td>
      </tr>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Swapped Rate
            <template #tooltip>
              {{ dexTradesHints.swappedRate }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <not-available-label v-if="!trade.rate"/>
          {{ trade.rate }}
        </td>
      </tr>
      <tr class="dex-trades-table-condensed__row">
        <th class="dex-trades-table-condensed__header">
          <app-tooltip>
            Value
            <template #tooltip>
              {{ dexTradesHints.value }}
            </template>
          </app-tooltip>
        </th>
        <td class="dex-trades-table-condensed__data">
          <not-available-label v-if="trade.value === '0'"/>
          <template v-else>
            $ {{ trade.value }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { dexTradesHints } from '@/utils/hints/dexTradesHints'

defineProps({
  trades: {
    type: Object,
    required: true,
  },
})

function getChipVariant(action) {
  const variants = {
    BUY: 'error',
    SELL: 'success',
    SWAP: 'primary',
  }
  return variants[action]
}
</script>

<style scoped>
.dex-trades-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
