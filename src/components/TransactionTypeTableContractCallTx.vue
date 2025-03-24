<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.status }}
          </hint-tooltip>
          Status
        </th>
        <td>
          <transaction-type-status-label :status="transactionData.result"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.contractId }}
          </hint-tooltip>
          Smart Contract
        </th>
        <td>
          <app-link :to="`/contracts/${transactionData.contractId}`">
            {{ transactionData.contractId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.caller }}
          </hint-tooltip>
          Caller
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.callerId}`">
            {{ transactionData.callerId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.entrypoint }}
          </hint-tooltip>
          Entrypoint
        </th>
        <td>
          <app-chip>
            {{ formatNullable(transactionData.function) }}
          </app-chip>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.arguments }}
          </hint-tooltip>
          Arguments
        </th>
        <td>
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
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.return }}
          </hint-tooltip>
          Return
        </th>
        <td>
          {{ formatNullable(transactionData.return) }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.gasLimit }}
          </hint-tooltip>
          Gas Limit
        </th>
        <td>
          {{ transactionData.gas }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.gasPrice }}
          </hint-tooltip>
          Gas Price
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.gasPrice)"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.gasUsed }}
          </hint-tooltip>
          Gas Used
        </th>
        <td>
          {{ transactionData.gasUsed }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.gasCost }}
          </hint-tooltip>
          Gas Costs
        </th>
        <td>
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
@import url("../assets/styles/utilities/_detail-table.css");
</style>
