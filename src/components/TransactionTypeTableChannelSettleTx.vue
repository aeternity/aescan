<template>
  <table class="transaction-type-panel-channel-settle-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiatorSettleAmount }}
          </hint-tooltip>
          Initiator / Amount
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
          /
          <price-label
            :price="formatAettosToAe(transactionData.initiatorAmountFinal)"
            :max-digits="null"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.responderCloseAmount }}
          </hint-tooltip>
          Responder / Amount
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
          /
          <price-label
            :price="formatAettosToAe(transactionData.responderAmountFinal)"
            :max-digits="null"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-settle-tx__row">
        <th class="transaction-type-panel-channel-settle-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.settledBy }}
          </hint-tooltip>
          Settled By
        </th>
        <td class="transaction-type-panel-channel-settle-tx__data">
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
.transaction-type-panel-channel-settle-tx {
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
