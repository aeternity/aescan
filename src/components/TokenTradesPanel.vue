<template>


  <!--    <paginated-content-->
  <!--      :entities="tokenEvents"-->
  <!--      pagination-style="history"-->
  <!--      :total-count="tokenEventsCount"-->
  <!--      @prev-clicked="loadPrevEvents"-->
  <!--      @next-clicked="loadNextEvents">-->
  <!--      <token-events-table-->
  <!--        v-if="tokenEvents"-->
  <!--        :token-events="tokenEvents"-->
  <!--        class="token-events-panel__table u-hidden-mobile"/>-->
  <!--      <token-events-table-condensed-->
  <!--        v-if="tokenEvents"-->
  <!--        :token-events="tokenEvents"-->
  <!--        class="u-hidden-desktop"/>-->
  <!--    </paginated-content>-->


  <table class="dex-trades-table">
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

    <tr
      v-for="trade in trades.data"
      :key="trade.txHash">
      <td>
        <value-hash-ellipsed
          :link-to="`/transactions/${trade.txHash}`"
          :hash="trade.txHash"/>
      </td>
      <td>
        <block-time-cell
          :height="trade.height"
          :timestamp="trade.timestamp"/>
      </td>
      <td>
        <app-chip :variant="getChipVariant(trade.action)">
          {{ trade.action }}
        </app-chip>
      </td>
      <td>
        <price-label
          :contract-id="trade.fromContract"
          :currency="trade.fromToken"
          :price="trade.fromAmount"
          :max-digits="4"
          :has-link="true"/>
      </td>
      <td>
        <price-label
          :contract-id="trade.toContract"
          :currency="trade.toToken"
          :price="trade.toAmount"
          :max-digits="4"
          :has-link="true"/>
      </td>
      <td>
        <not-available-label v-if="!trade.rate"/>
        {{ trade.rate }}
      </td>
      <td>
        <not-available-label v-if="trade.value === '0'"/>
        <template v-else>
          $ {{ trade.value }}
        </template>
      </td>
    </tr>
  </table>


  {{ trades }}
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTokenDetailsStore } from '@/stores/tokenDetails'

const { trades } = storeToRefs(useTokenDetailsStore())
const { fetchTokenTrades } = useTokenDetailsStore()
const route = useRoute()
//
// function loadPrevEvents() {
//   fetchTokenEvents({ queryParameters: tokenEvents.value.prev })
// }
//
// function loadNextEvents() {
//   fetchTokenEvents({ queryParameters: tokenEvents.value.next })
// }


function getChipVariant(action) {
  const variants = {
    BUY: 'error',
    SELL: 'success',
    SWAP: 'primary',
  }
  return variants[action]
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchTokenTrades({
    limit: limit.value,
    contractId: route.params.id,
  })
}
</script>

<style scoped>
.token-events-panel__table {
  margin-bottom: var(--space-4);
}
</style>
