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
          <app-link :to="`/accounts/${transactionData.senderId}`">
            {{ transactionData.senderId }}
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
          <app-link
            v-if="!transactionData.recipient"
            :to="`/accounts/${transactionData.recipientId}`">
            {{ transactionData.recipientId }}
          </app-link>
          <app-link
            v-else
            :to="`/accounts/${transactionData.recipient.account}`">
            {{ formatEllipseHash(transactionData.recipient.account) }}
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
          <!--          todo raw in similar components-->
          {{ formatAettosToAe(transactionData.amount) }}
          <price-label
            :price="formatAettosToAe(transactionData.amount)"
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
          {{ decode(transactionData.payload) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { decode } from '@aeternity/aepp-sdk'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");

.transaction-type-panel-spend-tx {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__label-link {
    text-decoration: none;
  }
}
</style>
