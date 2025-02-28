<template>
  <table class="transaction-type-panel-channel-withdraw-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <app-link
            :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.withdrawRound }}
          </hint-tooltip>
          Round
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.withdrawRecipient }}
          </hint-tooltip>
          Recipient
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <app-link
            :to="`/accounts/${transactionData.toId}`">
            {{ transactionData.toId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-withdraw-tx__row">
        <th class="transaction-type-panel-channel-withdraw-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.withdrawAmount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-channel-withdraw-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
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
.transaction-type-panel-channel-withdraw-tx {
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
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
