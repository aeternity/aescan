<template>
  <table class="transaction-type-panel-contract-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.status }}
          </hint-tooltip>
          Status
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <transaction-type-status-label :status="transactionData.returnType"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.contractId }}
          </hint-tooltip>
          Smart Contract
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ formatNullable(transactionData.contractId) }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.createdBy }}
          </hint-tooltip>
          Created By
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <app-link :to="`/accounts/${transactionData.ownerId}`">
            {{ transactionData.ownerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.arguments }}
          </hint-tooltip>
          Arguments
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasLimit }}
          </hint-tooltip>
          Gas Limit
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <div class="transaction-type-panel-contract-create-tx__container">
            {{ transactionData.gas }}
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
          Gas Price
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <div class="transaction-type-panel-contract-create-tx__container">
            <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasUsed }}
          </hint-tooltip>
          Gas Used
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <div class="transaction-type-panel-contract-create-tx__container">
            {{ transactionData.gasUsed }}
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-create-tx__row">
        <th class="transaction-type-panel-contract-create-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasCost }}
          </hint-tooltip>
          Gas Costs
        </th>
        <td class="transaction-type-panel-contract-create-tx__data">
          <div class="transaction-type-panel-contract-create-tx__container">
            <price-label :price="formatAettosToAe(gasCosts)"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
