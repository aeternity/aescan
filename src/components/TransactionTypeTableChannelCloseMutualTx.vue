<template>
  <table class="transaction-type-panel-channel-close-mutual-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link :to="`/state-channels/${transactionData.channel_id}`">
            {{ transactionData.channel_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Initiator / Amount
          <hint-tooltip>
            {{ stateChannelsHints.initiatorAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
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
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Responder / Amount
          <hint-tooltip>
            {{ stateChannelsHints.responderAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
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
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Sent By
          <hint-tooltip>
            {{ stateChannelsHints.sentBy }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link :to="`/accounts/${transactionData.from_id}`">
            {{ transactionData.from_id }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '../utils/hints/stateChannelsHints'
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
.transaction-type-panel-channel-close-mutual-tx {
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
