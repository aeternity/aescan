<template>
  <table class="transaction-type-panel-channel-snapshot-solo-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          Channel id
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          <app-link :to="`/state-channels/${transactionData.channel_id}`">
            {{ transactionData.channel_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          Round
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          Initiator
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          Responder
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          Snapshotted by
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
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

export default {
  name: 'TransactionTypeTableChannelSnapshotSoloTx',
  components: {
    AppLink,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style scoped>
.transaction-type-panel-channel-snapshot-solo-tx {
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
