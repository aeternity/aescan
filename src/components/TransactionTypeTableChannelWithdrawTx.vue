<template>
  <table class="transaction-type-panel-channel-withdraw-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Channel id
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{ transactionData.channel_id }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Round
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Recipient
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <app-link :to="`/accounts/${transactionData.to_id}`">
            {{ transactionData.to_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Amount
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{
            formatAePrice(formatAettosToAe(transactionData.amount), null)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

export default {
  name: 'TransactionTypeTableChannelWithdrawTx',
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
  },
}
</script>

<style scoped>
.transaction-type-panel-channel-withdraw-tx {
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
}
</style>
