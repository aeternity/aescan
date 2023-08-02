<template>
  <table class="transaction-type-panel-channel-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Channel Reserve
          <hint-tooltip>
            {{ stateChannelsHints.channelReserve }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{
            formatAePrice(
              formatAettosToAe(transactionData.channelReserve),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Initiator / Amount
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCreateAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.initiatorId}`">
            {{ transactionData.initiatorId }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.initiatorAmount),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Initiator Delegates
          <hint-tooltip>
            {{ stateChannelsHints.initiatorDelegates }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Responder / Amount
          <hint-tooltip>
            {{ stateChannelsHints.responderCreateAmount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.responderId}`">
            {{ transactionData.responderId }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.responderAmount),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Responder Delegates
          <hint-tooltip>
            {{ stateChannelsHints.responderDelegates }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Lock Period
          <hint-tooltip>
            {{ stateChannelsHints.lockPeriod }}
          </hint-tooltip>
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
.transaction-type-panel-channel-create-tx {
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
