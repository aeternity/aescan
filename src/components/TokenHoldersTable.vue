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
          <price-label
            :price="holder.amount"
            :currency="tokenDetails.symbol"
            :contract-id="holder.contractId"/>
        </td>
        <td>
          {{ holder.percentage }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
</script>
