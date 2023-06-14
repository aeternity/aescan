<template>
  <table class="tokens-table">
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
          Smart Contract ID
          <hint-tooltip>
            {{ tokensHints.smartContractId }}
          </hint-tooltip>
        </th>
        <th>
          Amount
          <hint-tooltip>
            {{ tokensHints.supplyAmount }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="token in tokens.data"
        :key="token.contract_id">
        <td>
          <app-link
            :to="`/tokens/${token.contract_id}`"
            class="tokens-table__link">
            <token-symbol-icon
              :contract-id="token.contract_id"
              class="tokens-table__icon"/>
            {{ token.symbol }}
          </app-link>
        </td>
        <td>{{ token.name }}</td>
        <td>
          <value-hash-ellipsed
            :link-to="`/contracts/${token.contract_id}`"
            :hash="token.contract_id "/>
        </td>
        <td>{{ token.amount }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>

import TokenSymbolIcon from '@/components/TokenSymbolIcon'
import { tokensHints } from '@/utils/hints/tokensHints'

defineProps({
  tokens: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.tokens-table {
  margin-bottom: var(--space-2);

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
