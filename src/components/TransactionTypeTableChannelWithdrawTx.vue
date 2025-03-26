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
            {{ stateChannelsHints.withdrawRound }}
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
            {{ stateChannelsHints.withdrawRecipient }}
          </hint-tooltip>
          Recipient
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.toId}`">
            {{ transactionData.toId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ stateChannelsHints.withdrawAmount }}
          </hint-tooltip>
          Amount
        </th>
        <td>
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
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
