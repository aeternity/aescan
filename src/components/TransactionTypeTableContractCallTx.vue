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
              {{ formatNullable(formattedArguments) }}
            </div>
            <app-button
              v-show="isArgumentsLong"
              variant="link"
              @click="toggleCollapse">
              {{ isCollapsed ? 'Show more' : 'Show less' }}
            </app-button>
          </template>
          <template v-else>
            {{ formatNullable(formattedArguments) }}
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
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ transactionData.gas }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
          Gas Price
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasUsed }}
          </hint-tooltip>
          Gas Used
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          {{ transactionData.gasUsed }}
        </td>
      </tr>
      <tr class="transaction-type-panel-contract-call-tx__row">
        <th class="transaction-type-panel-contract-call-tx__table-header">
          <hint-tooltip>
            {{ contractsHints.gasCost }}
          </hint-tooltip>
          Gas Costs
        </th>
        <td class="transaction-type-panel-contract-call-tx__data">
          <price-label :price="formatAettosToAe(gasCosts)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'

const isCollapsed = ref(true)

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const formattedArguments = ref(traverseAndFormatInts(props.transactionData.arguments))
const gasCosts = computed(() => props.transactionData.gasUsed * props.transactionData.gasPrice)
const isArgumentsLong = computed(() => JSON.stringify(formattedArguments.value).length > 300)
const shortArguments = computed(() => isArgumentsLong.value ? JSON.stringify(formattedArguments.value).substr(0, 300) + '...' : formattedArguments.value)

function traverseAndFormatInts(data) {
  return data.map(item => {
    if (item.type === 'int') {
      return {
        ...item,
        value: formatInt(item.value),
      }
    } else if (item.type === 'tuple') {
      return {
        ...item,
        value: traverseAndFormatInts(item.value),
      }
    } else {
      return item
    }
  })
}

function formatInt(value) {
  return Number(value).toLocaleString('fullwide', { useGrouping: false })
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.transaction-type-panel-contract-call-tx {
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

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
