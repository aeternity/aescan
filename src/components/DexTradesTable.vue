<template>
  <table>
    <tr>
      <td>Hash</td>
      <td>Executed</td>
      <td>Action</td>
      <td>Token Amount (Out)</td>
      <td>Token Amount (In)</td>
      <td>Swapped Rate</td>
      <td>Value</td>
    </tr>

    <tr
      v-for="trade in trades.data"
      :key="trade.txHash">
      <td>
        <value-hash-ellipsed
          :link-to="`/transactions/${trade.txHash}`"
          :hash="trade.txHash"/>
      </td>
      <td>a</td>
      <td>
        <app-chip :variant="getChipVariant(trade.amounts)">
          {{ getAction(trade.amounts) }}
        </app-chip>
      </td>
      <td>{{ formatNumber(trade.amounts[getInIndex(trade.amounts)]) }} {{ trade.toToken }}</td>
      <td>{{ formatNumber(trade.amounts[getOutIndex(trade.amounts)]) }} {{ trade.fromToken }}</td>
      <td>a</td>
      <td>{{ trade.amounts }}</td>
    </tr>
  </table>
</template>

<script setup>
import ValueHashEllipsed from '~/components/ValueHashEllipsed'

defineProps({
  trades: {
    type: Array,
    required: true,
  },
})

function getAction(amounts) {
  if (amounts[0] === 0) {
    // return 'swap_exact_ae_for_tokens'
    return 'BUY'
  }
  if (amounts[1] === 0 && amounts[2] === 0) {
    // return 'swap_ae_for_exact_tokens'
    return 'SELL'
  }
  if (amounts[3] === 0) {
    // return 'swap_ae_for_exact_tokens'
    return 'SWAP'
  }
  return null
}

function getInIndex(amounts) {
  const action = getAction(amounts)
  if (action === 'BUY') {
    return 1
  }
  if (action === 'SELL') {
    return 3
  }
  if (action === 'SWAP') {
    return 2
  }
}

function getOutIndex(amounts) {
  const action = getAction(amounts)
  if (action === 'BUY') {
    return 2
  }
  if (action === 'SELL') {
    return 0
  }
  if (action === 'SWAP') {
    return 0
  }
}

function getChipVariant(amounts) {
  const action = getAction(amounts)
  if (action === 'BUY') {
    return 'error'
  }
  if (action === 'SELL') {
    return 'success'
  }
  if (action === 'SWAP') {
    return 'primary'
  }
}
</script>
