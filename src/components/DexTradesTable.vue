<template>
  <table>
    <!--    todo hints-->
    <!--    todo mobile view-->
    <!--    todo test-->
    <!--    todo naming-->
    <tr>
      <th>Hash</th>
      <th>
        <time-toggle-button>Executed</time-toggle-button>
      </th>
      <th>Action</th>
      <th>Token Amount (In)</th>
      <th/>
      <th>Token Amount (Out)</th>

      <th>Swapped Rate</th>
      <th>Value</th>
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
        <transaction-arrow-right-icon/>
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
        {{ trade.rate }}
      </td>
      <td>$ {{ trade.value }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  trades: {
    type: Array,
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
