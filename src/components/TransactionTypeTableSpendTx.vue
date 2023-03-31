<template>
  <table class="transaction-type-panel-spend-tx__table">
    <tbody>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Sender
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link :to="`/accounts/${transactionData.sender_id}`">
            <span class="transaction-type-panel-spend-tx__hash">{{
              transactionData.sender_id
            }}</span>
            <span class="transaction-type-panel-spend-tx__hash-ellipse">{{
              formatEllipseHash(transactionData.sender_id)
            }}</span>
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Recipient
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link
            v-if="!transactionData.recipient"
            :to="`/accounts/${transactionData.recipient_id}`">
            <span class="transaction-type-panel-spend-tx__hash">{{
              transactionData.recipient_id
            }}</span>
            <span class="transaction-type-panel-spend-tx__hash-ellipse">{{
              formatEllipseHash(transactionData.recipient_id)
            }}</span>
          </app-link>
          <app-link
            v-else
            :to="`/accounts/${transactionData.recipient.account}`">
            {{ formatEllipseHash(transactionData.recipient.account) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Amount
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.amount), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Payload
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          {{ decode(transactionData.payload) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { decode } from '@aeternity/aepp-sdk'
import { formatAePrice, formatAettosToAe, formatEllipseHash } from '@/utils/format'
import AppLink from '@/components/AppLink'

export default {
  name: 'TransactionTypeTableSpendTx',
  components: {
    AppLink,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatAePrice,
    formatAettosToAe,
    formatEllipseHash,
    decode,
  },
}
</script>

<style scoped>
.transaction-type-panel-spend-tx {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__label-link {
    text-decoration: none;
  }

  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__hash {
    display: none;

    @media (--desktop) {
      display: inline;
    }
  }

  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
