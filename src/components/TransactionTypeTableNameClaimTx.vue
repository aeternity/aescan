<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
          Name
        </th>
        <td>
          <app-link :to="`/names/${transactionData.name}`">
            {{ transactionData.name }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ namesHints.claimer }}
          </hint-tooltip>
          Claimer
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.accountId}`">
            {{ transactionData.accountId }}
          </app-link>
        </td>
      </tr>
      <tr v-if="transactionData.nameFee">
        <th>
          <hint-tooltip>
            {{ namesHints.activationPrice }}
          </hint-tooltip>
          Activation Price
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.nameFee)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");
</style>
