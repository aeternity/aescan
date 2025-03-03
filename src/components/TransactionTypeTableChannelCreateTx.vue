<template>
  <table class="transaction-type-panel-channel-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.channelReserve }}
          </hint-tooltip>
          Channel Reserve
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <price-label :price="formatAettosToAe(transactionData.channelReserve)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCreateAmount }}
          </hint-tooltip>
          Initiator
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.initiatorId}`">
            {{ transactionData.initiatorId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCreateAmount }}
          </hint-tooltip>
          Initiator Amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <price-label :price="formatAettosToAe(transactionData.initiatorAmount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.initiatorDelegates }}
          </hint-tooltip>
          Initiator Delegates
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.responderCreateAmount }}
          </hint-tooltip>
          Responder
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.responderId}`">
            {{ transactionData.responderId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.responderCreateAmount }}
          </hint-tooltip>
          Responder Amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <price-label :price="formatAettosToAe(transactionData.responderAmount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.responderDelegates }}
          </hint-tooltip>
          Responder Delegates
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          <hint-tooltip>
            {{ stateChannelsHints.lockPeriod }}
          </hint-tooltip>
          Lock Period
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.lock_period }}
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
.transaction-type-panel-channel-create-tx {
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
