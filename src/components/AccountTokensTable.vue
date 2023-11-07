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
          Smart Contract
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
          <app-link
            :to="`/tokens/${token.contractId}`"
            class="account-token-tables__link">
            <token-symbol-icon
              class="account-token-tables__icon"
              :contract-id="token.contractId"/>
            {{ token.tokenSymbol }}
          </app-link>
        </td>
        <td>
          {{ token.tokenName }}
        </td>
        <td>
          <value-hash-ellipsed
            :link-to="`/contracts/${token.contractId}`"
            :hash="token.contractId "/>
        </td>
        <td>
          {{ formatNumber(token.amount) }}
        </td>
        <td>
          {{ token.value !== null ? `$${formatNumber(token.value, null, null, 7)}` : 'N/A' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import { tokensHints } from '@/utils/hints/tokensHints'
import HintTooltip from '@/components/HintTooltip'
import TokenSymbolIcon from '~/components/TokenSymbolIcon'

defineProps({
  accountTokens: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-token-tables {
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
