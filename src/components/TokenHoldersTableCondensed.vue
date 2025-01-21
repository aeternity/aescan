<template>
  <div>
    <table
      v-for="holder in tokenHolders.data"
      :key="holder.address"
      class="token-holders-table-condensed__table">
      <tbody>
        <tr class="token-holders-table-condensed__row">
          <th class="token-holders-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.account }}
            </hint-tooltip>
            Account
          </th>
          <td class="token-holders-table-condensed__data">
            <value-hash-ellipsed
              :hash="holder.address"
              :link-to="`/accounts/${holder.address}`"/>
          </td>
        </tr>
        <tr class="token-holders-table-condensed__row">
          <th class="token-holders-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.amount }}
            </hint-tooltip>
            Amount
          </th>
          <td class="token-holders-table-condensed__data">
            <price-label
              :price="holder.amount"
              :currency="tokenDetails.symbol"
              :contract-id="holder.contractId"/>
          </td>
        </tr>
        <tr class="token-holders-table-condensed__row">
          <th class="token-holders-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.percentage }}
            </hint-tooltip>
            Percentage
          </th>
          <td class="token-holders-table-condensed__data">
            {{ holder.percentage }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style scoped>
.token-holders-table-condensed {
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
}
</style>
