<template>
  <table class="transaction-type-panel-name-claim-tx__table">
    <tbody>
      <tr class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
          Name
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          <app-link :to="`/names/${transactionData.name}`">
            {{ transactionData.name }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          <hint-tooltip>
            {{ namesHints.claimer }}
          </hint-tooltip>
          Claimer
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          <app-link :to="`/accounts/${transactionData.accountId}`">
            {{ transactionData.accountId }}
          </app-link>
        </td>
      </tr>
      <tr
        v-if="transactionData.nameFee"
        class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          <hint-tooltip>
            {{ namesHints.activationPrice }}
          </hint-tooltip>
          Activation Price
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          <price-label :price="formatAettosToAe(transactionData.nameFee)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppLink from '@/components/AppLink'
import { formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-name-claim-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__data {
    word-wrap: break-word;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
