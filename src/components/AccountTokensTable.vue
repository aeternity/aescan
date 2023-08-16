<template>
  <table>
    <thead>
      <tr>
        <th>
          Symbol
          <hint-tooltip>
            {{ tokensHints.tokenSymbol }}
          </hint-tooltip>
        </th>
        <th>
          Name
          <hint-tooltip>
            {{ tokensHints.tokenName }}
          </hint-tooltip>
        </th>
        <th>
          Contract
          <hint-tooltip>
            {{ tokensHints.smartContractId }}
          </hint-tooltip>
        </th>
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
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="token in accountTokens?.data"
        :key="token.contractId">
        <td>
          <app-link :to="`/tokens/${token.contractId}`">
            {{ token.tokenSymbol }}
          </app-link>
        </td>
        <td>
          <app-link :to="`/tokens/${token.contractId}`">
            {{ token.tokenName }}
          </app-link>
        </td>
        <td>
          <app-link :to="`/contracts/${token.contractId}`">
            {{ token.contractId }}
          </app-link>
        </td>
        <td>
          {{ token.amount }}
        </td>
        <td>
          {{ token.value !== null ? `$${formatNumber(token.value)}` : 'N/A' }}
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
