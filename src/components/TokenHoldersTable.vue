<template>
  <table>
    <thead>
      <tr>
        <th>
          Account
          <hint-tooltip>
            {{ tokensHints.account }}
          </hint-tooltip>
        </th>
        <th>
          Amount
          <hint-tooltip>
            {{ tokensHints.amount }}
          </hint-tooltip>
        </th>
        <th>
          Percentage
          <hint-tooltip>
            {{ tokensHints.percentage }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="holder in tokenHolders.data"
        :key="holder.address">
        <td>
          <value-hash-ellipsed
            :hash="holder.address"
            :link-to="`/accounts/${holder.address}`"/>
        </td>
        <td>
          {{ formatNumber(holder.amount, 0, tokenDetails.decimals) }} {{ tokenDetails.symbol }}
        </td>
        <td>
          {{ formatPercentage(holder.percentage) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatNumber } from '@/utils/format'
import { tokensHints } from '@/utils/hints/tokensHints'

defineProps({
  tokenHolders: {
    type: Object,
    required: true,
  },
  tokenDetails: {
    type: Object,
    required: true,
  },
})

function formatPercentage(percentage) {
  if (Math.abs(percentage) >= 0.00001) {
    return `${formatNumber(Math.abs(percentage))} %`
  }
  if (Math.abs(percentage) === 0) {
    return '0 %'
  }
  if (Math.abs(percentage) < 0.00001) {
    return '~0 %'
  }
}
</script>
