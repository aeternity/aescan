<template>
  <table class="transaction-type-panel-contract-call-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Status
          <hint-tooltip>
            {{ contractsHints.contractStatus }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <transaction-type-status-label :status="transactionData.result"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Smart Contract
          <hint-tooltip>
            {{ contractsHints.contractSmartContract }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/contracts/${transactionData.contract_id}`">
            {{ transactionData.contract_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Caller
          <hint-tooltip>
            {{ contractsHints.contractCaller }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/accounts/${transactionData.caller_id}`">
            {{ transactionData.caller_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Amount
          <hint-tooltip>
            {{ contractsHints.contractAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.amount), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Entry Point
          <hint-tooltip>
            {{ contractsHints.contractEntryPoint }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-chip>
            {{ formatNullable(transactionData.function) }}
          </app-chip>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Arguments
          <hint-tooltip>
            {{ contractsHints.contractArguments }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ formatNullable(transactionData.arguments) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Return
          <hint-tooltip>
            {{ contractsHints.contractReturn }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ formatNullable(transactionData.return) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Gas Limit
          <hint-tooltip>
            {{ contractsHints.contractGasLimit }}
          </hint-tooltip>
          /
          <wbr>
          Gas Price
          <hint-tooltip>
            {{ contractsHints.contractGasPrice }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ transactionData.gas }}
          /
          {{ formatAePrice(formatAettosToAe(transactionData.gas_price), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Gas Used
          <hint-tooltip>
            {{ contractsHints.contractGasUsed }}
          </hint-tooltip>
          /
          <wbr>
          Gas Costs
          <hint-tooltip>
            {{ contractsHints.contractGasCost }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ formatNullable(transactionData.gas_used) }}
          /
          {{ formatNullable(formatAePrice(formatAettosToAe(gasCosts), null)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import AppLink from '@/components/AppLink'
import TransactionTypeStatusLabel from '@/components/TransactionTypeStatusLabel'
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'
import AppChip from '@/components/AppChip'

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
.transaction-type-panel-contract-call-tx {
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
