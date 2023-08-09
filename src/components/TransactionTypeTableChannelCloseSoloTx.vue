<template>
  <table class="transaction-type-panel-channel-close-solo-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-close-solo-tx__row">
        <th class="transaction-type-panel-channel-close-solo-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-solo-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-solo-tx__row">
        <th class="transaction-type-panel-channel-close-solo-tx__table-header">
          Round
          <hint-tooltip>
            {{ stateChannelsHints.closeRound }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-solo-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-solo-tx__row">
        <th class="transaction-type-panel-channel-close-solo-tx__table-header">
          Initiator
          <hint-tooltip>
            {{ stateChannelsHints.initiator }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-solo-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-solo-tx__row">
        <th class="transaction-type-panel-channel-close-solo-tx__table-header">
          Responder
          <hint-tooltip>
            {{ stateChannelsHints.responder }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-solo-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-solo-tx__row">
        <th class="transaction-type-panel-channel-close-solo-tx__table-header">
          Proposed By
          <hint-tooltip>
            {{ stateChannelsHints.closeProposedBy }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-solo-tx__data">
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
.transaction-type-panel-channel-close-solo-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1.5px solid var(--color-midnight-15);
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
