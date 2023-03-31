<template>
  <table class="transaction-type-panel-channel-settle-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          Channel id
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          {{ transactionData.channel_id }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          Initiator / amount
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.initiator_amount_final),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          Responder / amount
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.responder_amount_final),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          Settled by
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/accounts/${transactionData.from_id}`">
            {{ transactionData.from_id }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

export default {
  name: 'TransactionTypeTableChannelSettleTx',
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
.transaction-type-panel-channel-settle-tx {
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
