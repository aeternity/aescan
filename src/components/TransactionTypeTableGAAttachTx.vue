<template>
  <table class="transaction-type-panel-ga-attach-tx__table">
    <tbody>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxStatus }}
          </hint-tooltip>
          Status
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <transaction-type-status-label :status="transactionData.returnType"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAccount }}
          </hint-tooltip>
          Account
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link
            :to="`/accounts/${transactionData.ownerId}`"
            has-break>
            {{ transactionData.ownerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxSmartContractId }}
          </hint-tooltip>
          Smart Contract ID
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link
            :to="`/contracts/${transactionData.contractId}`"
            has-break>
            {{ formatNullable(transactionData.contractId) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAuthFunction }}
          </hint-tooltip>
          Auth Function
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ transactionData.authFunName }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxArguments }}
          </hint-tooltip>
          Arguments
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasLimit }}
          </hint-tooltip>
          Gas Limit
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            {{ transactionData.gas }}
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasPrice }}
          </hint-tooltip>
          Gas Price
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasUsed }}
          </hint-tooltip>
          Gas Used
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            {{ transactionData.gasUsed }}
          </div>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasCost }}
          </hint-tooltip>
          Gas Costs
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            <price-label :price="formatAettosToAe(gasCosts)"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'

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
.transaction-type-panel-ga-attach-tx {
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
    white-space: wrap;
    /*todo remove data completely or add wrap everywhere*/
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
