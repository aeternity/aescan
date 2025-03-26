<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxStatus }}
          </hint-tooltip>
          Status
        </th>
        <td>
          <transaction-type-status-label :status="transactionData.returnType"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAccount }}
          </hint-tooltip>
          Account
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.ownerId}`">
            {{ transactionData.ownerId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxSmartContractId }}
          </hint-tooltip>
          Smart Contract ID
        </th>
        <td>
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ formatNullable(transactionData.contractId) }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxAuthFunction }}
          </hint-tooltip>
          Auth Function
        </th>
        <td>
          {{ transactionData.authFunName }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.gaAttachTxArguments }}
          </hint-tooltip>
          Arguments
        </th>
        <td>
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr>
        <th>
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
        <td>
          <div class="transaction-type-panel-ga-attach-tx__container">
            {{ transactionData.gas }}
            /
            <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
          </div>
        </td>
      </tr>
      <tr>
        <th>
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
        <td>
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
@import url("../assets/styles/utilities/_detail-table.css");

.transaction-type-panel-ga-attach-tx {
  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
