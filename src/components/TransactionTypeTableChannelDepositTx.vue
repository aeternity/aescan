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
            {{ stateChannelsHints.depositRound }}
          </hint-tooltip>
          Round
        </th>
        <td>
          {{ transactionData.round }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.depositor }}
          </hint-tooltip>
          Depositor
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.fromId}`">
            {{ transactionData.fromId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.depositAmount }}
          </hint-tooltip>
          Amount
        </th>
        <td>
          <price-label
            :price="formatAettosToAe(transactionData.amount)"
            has-full-precision/>
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
