<template>
  <table class="transaction-type-panel-channel-withdraw-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Round
          <hint-tooltip>
            {{ stateChannelsHints.withdrawRound }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Recipient
          <hint-tooltip>
            {{ stateChannelsHints.withdrawRecipient }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <app-link :to="`/accounts/${transactionData.toId}`">
            {{ transactionData.toId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          Amount
          <hint-tooltip>
            {{ stateChannelsHints.withdrawAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.amount), null) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-channel-withdraw-tx {
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
