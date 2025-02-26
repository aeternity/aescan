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
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="token in tokens.data"
        :key="token.contractId">
        <td class="tokens-table__data">
          <app-link
            :to="`/tokens/${token.contractId}`"
            class="tokens-table__link">
            <token-symbol-icon
              :contract-id="token.contractId"
              class="tokens-table__icon"/>
            {{ token.symbol }}
            <not-available-label v-if="!token.symbol"/>
          </app-link>
        </td>
        <td class="tokens-table__data">
          {{ token.name }}
          <not-available-label v-if="!token.name"/>
        </td>
        <td class="tokens-table__data">
          <value-hash-ellipsed
            :link-to="`/contracts/${token.contractId}`"
            :hash="token.contractId "/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
  margin-bottom: var(--space-4);

  &__data {
    white-space: nowrap;
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
