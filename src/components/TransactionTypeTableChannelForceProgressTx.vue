<template>
  <table class="transaction-type-panel-channel-force-progress-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-force-progress-tx__row">
        <th
          class="transaction-type-panel-channel-force-progress-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-force-progress-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-force-progress-tx__row">
        <th class="transaction-type-panel-channel-force-progress-tx__table-header">
          Round
          <hint-tooltip>
            {{ stateChannelsHints.forceProgressRound }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-force-progress-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-force-progress-tx__row">
        <th
          class="transaction-type-panel-channel-force-progress-tx__table-header">
          Initiator
          <hint-tooltip>
            {{ stateChannelsHints.initiator }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-force-progress-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-force-progress-tx__row">
        <th
          class="transaction-type-panel-channel-force-progress-tx__table-header">
          Responder
          <hint-tooltip>
            {{ stateChannelsHints.responder }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-force-progress-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-force-progress-tx__row">
        <th
          class="transaction-type-panel-channel-force-progress-tx__table-header">
          Forced By
          <hint-tooltip>
            {{ stateChannelsHints.forcedBy }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-force-progress-tx__data">
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
.transaction-type-panel-channel-force-progress-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
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
