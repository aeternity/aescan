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
          <app-link :to="`/accounts/${transactionData.ownerId}`">
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
          <app-link :to="`/contracts/${transactionData.contractId}`">
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
          /
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasPrice }}
          </hint-tooltip>
          Gas Price
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            {{ transactionData.gas }}
            /
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
          /
          <wbr>

          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasCost }}
          </hint-tooltip>
          Gas Costs
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <div class="transaction-type-panel-ga-attach-tx__container">
            {{ transactionData.gasUsed }}
            /
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
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: var(--space-1);
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 28px;
    padding-top: var(--space-0);

    @media (--mobile) {
      padding-top: var(--space-1);
      display: table-cell;
    }
  }

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
