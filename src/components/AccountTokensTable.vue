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
        <td class="account-tokens-table__data">
          <price-label
            :price="token.amount"
            :contract-id="token.contractId"
            :currency="token.tokenSymbol"/>
        </td>
        <td class="account-tokens-table__data">
          {{ token.value }}
        </td>
        <td class="account-tokens-table__data">
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
import { tokensHints } from '@/utils/hints/tokensHints'

defineProps({
  accountTokens: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-tokens-table__data {
  white-space: nowrap;
}
</style>
