<template>
  <table class="transaction-type-panel-channel-snapshot-solo-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.snapshotRound }}
          </hint-tooltip>
          Round
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-snapshot-solo-tx__row">
        <th class="transaction-type-panel-channel-snapshot-solo-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiator }}
          </hint-tooltip>
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
          <hint-tooltip>
            {{ stateChannelsHints.responder }}
          </hint-tooltip>
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
          <hint-tooltip>
            {{ stateChannelsHints.snapshottedBy }}
          </hint-tooltip>
          Snapshotted By
        </th>
        <td class="transaction-type-panel-channel-snapshot-solo-tx__data">
          <app-link :to="`/accounts/${transactionData.fromId}`">
            {{ transactionData.fromId }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import AppLink from '@/components/AppLink'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-channel-snapshot-solo-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__data {
    word-wrap: break-word;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
