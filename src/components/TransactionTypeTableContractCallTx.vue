<template>
  <table class="transaction-type-panel-contract-call-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Status
          <hint-tooltip>
            {{ contractsHints.status }}
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
            {{ contractsHints.contractId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ transactionData.contractId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Caller
          <hint-tooltip>
            {{ contractsHints.caller }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/accounts/${transactionData.callerId}`">
            {{ transactionData.callerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Amount
          <hint-tooltip>
            {{ contractsHints.amount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          Entrypoint
          <hint-tooltip>
            {{ contractsHints.entrypoint }}
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
            {{ contractsHints.arguments }}
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
            {{ contractsHints.return }}
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
            {{ contractsHints.gasLimit }}
          </hint-tooltip>
          /
          <wbr>
          Gas Price
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <div class="transaction-type-panel-contract-call-tx__container">
            <price-label :price="transactionData.gas"/>
            /
            <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
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
        <td class="transaction-type-panel-contract-call-tx__data">
          <div class="transaction-type-panel-contract-call-tx__container">
            <price-label :price="transactionData.gasUsed"/>
            /
            <price-label :price="formatAettosToAe(gasCosts)"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import AppLink from '@/components/AppLink'
import TransactionTypeStatusLabel from '@/components/TransactionTypeStatusLabel'
import { formatAettosToAe, formatNullable } from '@/utils/format'
import AppChip from '@/components/AppChip'

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
.transaction-type-panel-contract-call-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
