<template>
  <table class="transaction-type-panel-name-transfer-tx__table">
    <tbody>
      <tr class="transaction-type-panel-name-transfer-tx__row">
        <th class="transaction-type-panel-name-transfer-tx__table-header">
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
          Name
        </th>
        <td class="transaction-type-panel-name-transfer-tx__data">
          <app-link
            v-if="transactionData.name"
            :to="`/names/${transactionData.name}`">
            {{ transactionData.name }}
          </app-link>
          <template v-else>
            {{ formatNullable(transactionData.name) }}
          </template>
        </td>
      </tr>
      <tr class="transaction-type-panel-name-transfer-tx__row">
        <th class="transaction-type-panel-name-transfer-tx__table-header">
          <hint-tooltip>
            {{ namesHints.oldOwner }}
          </hint-tooltip>
          Old Owner
        </th>
        <td class="transaction-type-panel-name-transfer-tx__data">
          <app-link :to="`/accounts/${transactionData.accountId}`">
            {{ transactionData.accountId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-name-transfer-tx__row">
        <th class="transaction-type-panel-name-transfer-tx__table-header">
          <hint-tooltip>
            {{ namesHints.newOwner }}
          </hint-tooltip>
          New Owner
        </th>
        <td class="transaction-type-panel-name-transfer-tx__data">
          <app-link :to="`/accounts/${transactionData.recipientId}`">
            {{ transactionData.recipientId }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppLink from '@/components/AppLink'
import { formatNullable } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-name-transfer-tx {
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
