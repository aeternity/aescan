<template>
  <table>
    <thead>
      <tr>
        <th>
          Amount
          <hint-tooltip>
            {{ tokensHints.amount }}
          </hint-tooltip>
        </th>
        <th>
          Value
          <hint-tooltip>
            {{ tokensHints.value }}
          </hint-tooltip>
        </th>
        <th>
          Name
          <hint-tooltip>
            {{ tokensHints.tokenName }}
          </hint-tooltip>
        </th>
        <th>
          Smart Contract
          <hint-tooltip>
            {{ tokensHints.smartContractId }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="token in accountTokens?.data"
        :key="token.contractId">
        <td>
          <price-label
            :price="token.amount"
            :contract-id="token.contractId"
            :currency="token.tokenSymbol"/>
        </td>
        <td>
          {{ token.value }}
        </td>
        <td>
          <app-link :to="`/tokens/${token.contractId}`">
            {{ token.tokenName }}
          </app-link>
        </td>
        <td>
          <value-hash-ellipsed
            :link-to="`/contracts/${token.contractId}`"
            :hash="token.contractId"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import { tokensHints } from '@/utils/hints/tokensHints'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  accountTokens: {
    type: Object,
    default: null,
  },
})
</script>
