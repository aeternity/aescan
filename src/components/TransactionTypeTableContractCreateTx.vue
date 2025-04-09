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
          <transaction-type-status-label :status="transactionData.returnType"/>
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
            {{ formatNullable(transactionData.contractId) }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractsHints.createdBy }}
          </hint-tooltip>
          Created By
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
            {{ contractsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.amount)"
            has-full-precision/>
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
          {{ formatNullable(transactionData.args) }}
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
</style>
