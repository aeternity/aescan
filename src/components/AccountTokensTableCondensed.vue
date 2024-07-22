<template>
  <div class="account-tokens-table-condensed">
    <table
      v-for="token in accountTokens?.data"
      :key="token.contractId"
      class="account-tokens-table-condensed__table">
      <tbody>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <app-tooltip>
              Symbol
              <template #tooltip>
                {{ tokensHints.tokenSymbol }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-tokens-table-condensed__data">
            <app-link
              :to="`/tokens/${token.contractId}`"
              class="account-tokens-table-condensed__link">
              <token-symbol-icon
                class="account-tokens-table-condensed__icon"
                :contract-id="token.contractId"/>
              {{ token.tokenSymbol }}
            </app-link>
          </td>
        </tr>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ tokensHints.amount }}
              </template>
            </app-tooltip>
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
            <app-tooltip>
              Value
              <template #tooltip>
                {{ tokensHints.value }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-tokens-table-condensed__data">
            {{ token.value }}
          </td>
        </tr>
        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ tokensHints.tokenName }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-tokens-table-condensed__data">
            <app-link :to="`/tokens/${token.contractId}`">
              {{ token.tokenName }}
            </app-link>
          </td>
        </tr>

        <tr class="account-tokens-table-condensed__row">
          <th class="account-tokens-table-condensed__header">
            <app-tooltip>
              Smart Contract
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
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
import AppLink from '@/components/AppLink'
import AppTooltip from '@/components/AppTooltip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { tokensHints } from '@/utils/hints/tokensHints'
import TokenSymbolIcon from '@/components/TokenSymbolIcon'

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

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
