<template>
  <table class="transaction-type-panel-contract-call-tx__table">
    <tbody>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.status }}
          </hint-tooltip>
          Status
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <transaction-type-status-label :status="transactionData.result"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.contractId }}
          </hint-tooltip>
          Smart Contract
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ transactionData.contractId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.caller }}
          </hint-tooltip>
          Caller
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-link :to="`/accounts/${transactionData.callerId}`">
            {{ transactionData.callerId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.entrypoint }}
          </hint-tooltip>
          Entrypoint
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <app-chip>
            {{ formatNullable(transactionData.function) }}
          </app-chip>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.arguments }}
          </hint-tooltip>
          Arguments
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <template v-if="isArgumentsLong">
            <div v-show="isCollapsed">
              {{ shortArguments }}
            </div>
            <div v-show="!isCollapsed">
              {{ formatNullable(transactionData.arguments) }}
            </div>
            <app-button
              v-show="isArgumentsLong"
              variant="link"
              @click="toggleCollapse">
              {{ isCollapsed ? 'Show more' : 'Show less' }}
            </app-button>
          </template>
          <template v-else>
            {{ formatNullable(transactionData.arguments) }}
          </template>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.return }}
          </hint-tooltip>
          Return
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ formatNullable(transactionData.return) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasLimit }}
          </hint-tooltip>
          Gas Limit

          /
          <wbr>
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
          Gas Price
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
          <hint-tooltip>
            {{ contractsHints.gasUsed }}
          </hint-tooltip>
          Gas Used

          /
          <wbr>
          <hint-tooltip>
            {{ contractsHints.gasCost }}
          </hint-tooltip>
          Gas Costs
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

const isCollapsed = ref(true)
const isArgumentsLong = computed(() => JSON.stringify(props.transactionData.arguments).length > 300)
const shortArguments = computed(() => isArgumentsLong.value ? JSON.stringify(props.transactionData.arguments).substr(0, 300) + '...' : props.transactionData.arguments)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

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
