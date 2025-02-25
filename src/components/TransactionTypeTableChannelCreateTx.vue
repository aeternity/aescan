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
          <app-link
            :to="`/state-channels/${transactionData.channelId}`"
            has-break>
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
          Initiator / Amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <div class="transaction-type-panel-channel-create-tx__container">
            <app-link
              :to="`/accounts/${transactionData.initiatorId}`"
              has-break>
              {{ transactionData.initiatorId }}
            </app-link>
            /
            <price-label :price="formatAettosToAe(transactionData.initiatorAmount)"/>
          </div>
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
          Responder / Amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <div class="transaction-type-panel-channel-create-tx__container">
            <app-link
              :to="`/accounts/${transactionData.responderId}`"
              has-break>
              {{ transactionData.responderId }}
            </app-link>
            /
            <price-label :price="formatAettosToAe(transactionData.responderAmount)"/>
          </div>
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

  &__container {
    display: inline-flex;
    flex-direction: row;
    gap: var(--space-0);
  }
}
</style>
