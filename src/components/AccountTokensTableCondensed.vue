<template>
  <div class="account-tokens-table-condensed">
    <table
      v-for="token in accountTokens?.data"
      :key="token.contractId"
      class="account-tokens-table-condensed__table">
      <tbody>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.amount }}
            </hint-tooltip>
            Amount
          </th>
          <td class="account-tokens-table-condensed__data">
            <price-label
              :price="token.amount"
              :contract-id="token.contractId"
              :currency="token.tokenSymbol"/>
          </td>
        </tr>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.value }}
            </hint-tooltip>
            Value
          </th>
          <td class="account-tokens-table-condensed__data">
            {{ token.value }}
          </td>
        </tr>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Name
          </th>
          <td class="account-tokens-table-condensed__data">
            <app-link :to="`/tokens/${token.contractId}`">
              {{ token.tokenName }}
            </app-link>
          </td>
        </tr>

        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.smartContractId }}
            </hint-tooltip>
            Smart Contract
          </th>
          <td class="account-tokens-table-condensed__data">
            <value-hash-ellipsed
              :hash="token.contractId"
              :link-to="`/contracts/${token.contractId}`"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.account-tokens-table-condensed {
  &__table {
    background: var(--color-white);
    padding: var(--space-4);
    margin-bottom: var(--space-6);
  }

  &:last-of-type {
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
