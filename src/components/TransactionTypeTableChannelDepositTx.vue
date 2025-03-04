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
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: var(--space-1);
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
    padding-top: var(--space-0);

    @media (--mobile) {
      padding-top: var(--space-1);
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
