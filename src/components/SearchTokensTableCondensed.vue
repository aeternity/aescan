<template>
  <div>
    <table
      v-for="token in tokens.data"
      :key="token.contractId"
      class="search-tokens-table-condensed__table">
      <tbody>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Symbol
              <template #tooltip>
                {{ tokensHints.tokenSymbol }}
              </template>
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            <app-link
              :to="`/tokens/${token.contractId}`"
              class="search-tokens-table-condensed__link">
              <token-symbol-icon
                :contract-id="token.contractId"
                class="search-tokens-table-condensed__icon"/>
              {{ token.symbol }}
            </app-link>
          </td>
        </tr>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ tokensHints.tokenName }}
              </template>
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            {{ token.name }}
          </td>
        </tr>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Smart Contract ID
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/contracts/${token.contractId}`"
              :hash="token.contractId "/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

import AppLink from '@/components/AppLink'
import AppTooltip from '@/components/AppTooltip'
import { tokensHints } from '@/utils/hints/tokensHints'

defineProps({
  tokens: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.search-tokens-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }
}
</style>
