<template>
  <table class="dex-trades-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ dexTradesHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Executed</time-toggle-button>
          <hint-tooltip>
            {{ dexTradesHints.executed }}
          </hint-tooltip>
        </th>
        <th>
          Action
          <hint-tooltip>
            {{ dexTradesHints.action }}
          </hint-tooltip>
        </th>

        <th>
          Token Amount (Out)
          <hint-tooltip>
            {{ dexTradesHints.tokenAmountOut }}
          </hint-tooltip>
        </th>

        <th>
          Token Amount (In)
          <hint-tooltip>
            {{ dexTradesHints.tokenAmountIn }}
          </hint-tooltip>
        </th>
        <th>
          Swapped Rate
          <hint-tooltip>
            {{ dexTradesHints.swappedRate }}
          </hint-tooltip>
        </th>
        <th>
          Value
          <hint-tooltip>
            {{ dexTradesHints.value }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="trade in trades.data"
        :key="trade.txHash">
        <td class="dex-trades-table__data">
          <value-hash-ellipsed
            :link-to="`/transactions/${trade.txHash}`"
            :hash="trade.txHash"/>
        </td>
        <td class="dex-trades-table__data">
          <block-time-cell
            :height="trade.height"
            :timestamp="trade.timestamp"/>
        </td>
        <td class="dex-trades-table__data">
          <app-chip :variant="getChipVariant(trade.action)">
            {{ trade.action }}
          </app-chip>
        </td>
        <td class="dex-trades-table__data">
          <price-label
            :contract-id="trade.fromContract"
            :currency="trade.fromToken"
            :price="trade.fromAmount"
            :rounding-index="5"
            :has-link="true"/>
        </td>
        <td class="dex-trades-table__data">
          <price-label
            :contract-id="trade.toContract"
            :currency="trade.toToken"
            :price="trade.toAmount"
            :rounding-index="5"
            :has-link="true"/>
        </td>
        <td class="dex-trades-table__data">
          <not-available-label v-if="!trade.rate"/>
          <price-label
            v-else
            :rounding-index="4"
            :has-icon="false"
            currency="WAE"
            :price="trade.rate"/>
        </td>
        <td class="dex-trades-table__data">
          <not-available-label v-if="!trade.value"/>
          <price-label
            v-else
            :rounding-index="4"
            :price="trade.value"
            currency="$"/>
        </td>
      </tr>
    </tbody>
  </table>
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
.dex-trades-table__data {
  white-space: nowrap;
}
</style>
