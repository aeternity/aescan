<template>
  <table class="transaction-type-panel-ga-attach-tx__table">
    <tbody>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Status
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxStatus }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <transaction-type-status-label :status="transactionData.returnType"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Account
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAccount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link :to="`/accounts/${transactionData.ownerId}`">
            {{ transactionData.ownerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Smart Contract ID
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxSmartContractId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ formatNullable(transactionData.contractId) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Auth Function
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAuthFunction }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ transactionData.authFunName }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Arguments
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxArguments }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Gas Limit
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasLimit }}
          </hint-tooltip>
          /
          <wbr>
          Gas Price
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasPrice }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <price-label :price="transactionData.gas"/>
          /
          <price-label :price="transactionData.gasPrice"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Gas Used
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasUsed }}
          </hint-tooltip>
          /
          <wbr>
          Gas Costs
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxGasCost }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <price-label :price="transactionData.gasUsed"/>
          /
          <price-label :price="formatAettosToAe(gasCosts)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import AppLink from '@/components/AppLink'
import TransactionTypeStatusLabel from '@/components/TransactionTypeStatusLabel'
import { formatAettosToAe, formatNullable } from '@/utils/format'

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
