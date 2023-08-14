<template>
  <table class="transaction-type-panel-channel-slash-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-slash-tx__row">
        <th class="transaction-type-panel-channel-slash-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-slash-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-slash-tx__row">
        <th class="transaction-type-panel-channel-slash-tx__table-header">
          Round
          <hint-tooltip>
            {{ stateChannelsHints.slashedRound }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-slash-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-slash-tx__row">
        <th class="transaction-type-panel-channel-slash-tx__table-header">
          Slashed By
          <hint-tooltip>
            {{ stateChannelsHints.slashedBy }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-slash-tx__data">
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
.transaction-type-panel-channel-slash-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1.5px solid var(--color-midnight-25);
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
