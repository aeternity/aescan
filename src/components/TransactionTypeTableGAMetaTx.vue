<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.sender }}
          </hint-tooltip>
          Sender
        </th>
        <td>
          <app-link :to="`/accounts/${innerTransactionDetails.senderId}`">
            {{ innerTransactionDetails.senderId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.recipient }}
          </hint-tooltip>
          Recipient
        </th>
        <td>
          <app-link :to="`/accounts/${innerTransactionDetails.recipientId}`">
            {{ innerTransactionDetails.recipientId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(innerTransactionDetails.amount)"
            is-raw/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ transactionsHints.payload }}
          </hint-tooltip>
          Payload
        </th>
        <td>
          {{ payload }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { decode } from '@aeternity/aepp-sdk'
import { transactionsHints } from '@/utils/hints/transactionsHints'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const innerTransactionDetails = computed(() =>
  props.transactionData.tx.tx,
)

const payload = computed(() =>
  formatNullable(decode(innerTransactionDetails.value.payload).toString()),
)
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");
</style>
