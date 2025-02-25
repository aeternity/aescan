<template>
  <table class="transaction-type-panel-channel-close-mutual-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link
            :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCloseAmount }}
          </hint-tooltip>
          Initiator / Amount
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link
            :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
          /
          <price-label :price="formatAettosToAe(transactionData.initiatorAmountFinal)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-close-mutual-tx__row">
        <th class="transaction-type-panel-channel-close-mutual-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.responderCloseAmount }}
          </hint-tooltip>
          Responder / Amount
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
          <hint-tooltip>
            {{ stateChannelsHints.sentBy }}
          </hint-tooltip>
          Sent By
        </th>
        <td class="transaction-type-panel-channel-close-mutual-tx__data">
          <app-link
            :to="`/accounts/${transactionData.fromId}`">
            {{ transactionData.fromId }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

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
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    word-wrap: break-word;
    white-space: wrap;
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
