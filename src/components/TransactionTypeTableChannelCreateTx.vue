<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
          Channel ID
        </th>
        <td>
          <app-link :to="`/state-channels/${transactionData.channelId}`">
            {{ transactionData.channelId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.channelReserve }}
          </hint-tooltip>
          Channel Reserve
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.channelReserve)"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCreateAmount }}
          </hint-tooltip>
          Initiator
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.initiatorId}`">
            {{ transactionData.initiatorId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCreateAmount }}
          </hint-tooltip>
          Initiator Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.initiatorAmount)"
            has-full-precision/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.initiatorDelegates }}
          </hint-tooltip>
          Initiator Delegates
        </th>
        <td>
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.responderCreateAmount }}
          </hint-tooltip>
          Responder
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.responderId}`">
            {{ transactionData.responderId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.responderCreateAmount }}
          </hint-tooltip>
          Responder Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.responderAmount)"
            has-full-precision/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.responderDelegates }}
          </hint-tooltip>
          Responder Delegates
        </th>
        <td>
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.lockPeriod }}
          </hint-tooltip>
          Lock Period
        </th>
        <td>
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
@import url("../assets/styles/utilities/_detail-table.css");
</style>
