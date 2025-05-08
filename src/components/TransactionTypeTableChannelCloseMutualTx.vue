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
            {{ stateChannelsHints.initiatorCloseAmount }}
          </hint-tooltip>
          Initiator
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.channel.initiator}`">
            {{ transactionData.channel.initiator }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.initiatorCloseAmount }}
          </hint-tooltip>
          Initiator Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.initiatorAmountFinal)"
            has-full-precision/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.responderCloseAmount }}
          </hint-tooltip>
          Responder
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.channel.responder}`">
            {{ transactionData.channel.responder }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.responderCloseAmount }}
          </hint-tooltip>
          Responder Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.responderAmountFinal)"
            has-full-precision/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.sentBy }}
          </hint-tooltip>
          Sent By
        </th>
        <td>
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
