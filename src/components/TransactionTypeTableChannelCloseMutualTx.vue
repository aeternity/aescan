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
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Initiator / Amount
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCloseAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
          /
          <price-label :price="formatAettosToAe(transactionData.initiatorAmountFinal)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          Responder / Amount
          <hint-tooltip>
            {{ stateChannelsHints.responderCloseAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <div class="transaction-type-panel-channel-close-mutual-tx__container">
            <app-link :to="`/accounts/${transactionData.channel.responder}`">
              {{ transactionData.channel.responder }}
            </app-link>
            /
            <price-label :price="formatAettosToAe(transactionData.responderAmountFinal)"/>
          </div>
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
import { formatAettosToAe } from '@/utils/format'

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
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
