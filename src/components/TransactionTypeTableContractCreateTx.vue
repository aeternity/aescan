<template>
  <table class="transaction-type-panel-contract-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Status
          <hint-tooltip>
            {{ contractsHints.status }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <transaction-type-status-label :status="transactionData.returnType"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Smart Contract
          <hint-tooltip>
            {{ contractsHints.smartContract }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ transactionData.contractId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Created By
          <hint-tooltip>
            {{ contractsHints.createdBy }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/accounts/${transactionData.ownerId}`">
            {{ transactionData.ownerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Amount
          <hint-tooltip>
            {{ contractsHints.amount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.amount), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Arguments
          <hint-tooltip>
            {{ contractsHints.arguments }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Gas Limit
          <hint-tooltip>
            {{ contractsHints.gasLimit }}
          </hint-tooltip>
          /
          <wbr>
          Gas Price
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ transactionData.gas }}
          /
          {{ formatAePrice(formatAettosToAe(transactionData.gasPrice), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Gas Used
          <hint-tooltip>
            {{ contractsHints.gasUsed }}
          </hint-tooltip>
          /
          <wbr>
          Gas Costs
          <hint-tooltip>
            {{ contractsHints.gasCost }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ formatNullable(transactionData.gasUsed) }}
          /
          {{ formatNullable(formatAePrice(formatAettosToAe(gasCosts), null)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import TransactionTypeStatusLabel from '@/components/TransactionTypeStatusLabel'
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'
import { contractsHints } from '@/utils/hints/contractsHints'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const gasCosts = computed(() =>
  props.transactionData.gasUsed * props.transactionData.gasPrice,
)
</script>

<style scoped>
.transaction-type-panel-contract-create-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
