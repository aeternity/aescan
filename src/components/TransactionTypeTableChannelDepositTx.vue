<template>
  <table class="transaction-type-panel-channel-deposit-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.depositRound }}
          </hint-tooltip>
          Round
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.depositor }}
          </hint-tooltip>
          Depositor
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          <app-link :to="`/accounts/${transactionData.fromId}`">
            {{ transactionData.fromId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.depositAmount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import { formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-channel-deposit-tx {
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
