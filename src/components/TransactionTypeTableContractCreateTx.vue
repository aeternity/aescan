<template>
  <table class="transaction-type-panel-contract-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Status
          <hint-tooltip>
            {{ transactionsHints.contractStatus }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <transaction-type-status-label :status="transactionData.return_type"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Smart Contract
          <hint-tooltip>
            {{ transactionsHints.contractSmartContract }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/contracts/${transactionData.contract_id}`">
            {{ transactionData.contract_id }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Creator
          <hint-tooltip>
            {{ transactionsHints.contractCreator }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/accounts/${transactionData.owner_id}`">
            {{ transactionData.owner_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Amount
          <hint-tooltip>
            {{ transactionsHints.contractAmount }}
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
            {{ transactionsHints.contractArguments }}
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
            {{ transactionsHints.contractGasLimit }}
          </hint-tooltip>
          /
          <wbr>
          Gas Price
          <hint-tooltip>
            {{ transactionsHints.contractGasPrice }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ transactionData.gas }}
          /
          {{ formatAePrice(formatAettosToAe(transactionData.gas_price), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          Gas Used
          <hint-tooltip>
            {{ transactionsHints.contractGasUsed }}
          </hint-tooltip>
          /
          <wbr>
          Gas Costs
          <hint-tooltip>
            {{ transactionsHints.contractGasCost }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ formatNullable(transactionData.gas_used) }}
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

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const gasCosts = computed(() =>
  props.transactionData.gas_used * props.transactionData.gas_price,
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
