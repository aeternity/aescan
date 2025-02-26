<template>
  <table class="state-channels-table">
    <thead>
      <tr>
        <th>
          State Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
          </hint-tooltip>
        </th>
        <th>
          Status
          <hint-tooltip>
            {{ stateChannelsHints.status }}
          </hint-tooltip>
        </th>
        <th>
          Participants
          <hint-tooltip>
            {{ stateChannelsHints.participants }}
          </hint-tooltip>
        </th>
        <th>
          On-Chain TXs
          <hint-tooltip>
            {{ stateChannelsHints.onChainUpdates }}
          </hint-tooltip>
        </th>
        <th>
          Locked
          <hint-tooltip>
            {{ stateChannelsHints.locked }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Last Updated</time-toggle-button>
          <hint-tooltip>
            {{ stateChannelsHints.lastUpdated }}
          </hint-tooltip>
        </th>
        <th>
          Last TX Type
          <hint-tooltip>
            {{ stateChannelsHints.lastTxType }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="channel in stateChannels.data"
        :key="channel.id">
        <td class="state-channels-table__data">
          <value-hash-ellipsed
            :hash="channel.id"
            :link-to="`/state-channels/${channel.id}`"/>
        </td>
        <td class="state-channels-table__data">
          {{ channel.status }}
        </td>
        <td class="state-channels-table__data">
          <div>
            <div>
              Initiator:
              <value-hash-ellipsed
                :hash="channel.initiator"
                :link-to="`/accounts/${channel.initiator}`"/>
            </div>
            <div class="state-channels-table__participants">
              Responder:
              <value-hash-ellipsed
                :hash="channel.responder"
                :link-to="`/accounts/${channel.responder}`"/>
            </div>
          </div>
        </td>
        <td class="state-channels-table__data">
          {{ channel.updateCount }}
        </td>
        <td class="state-channels-table__data">
          <price-label :price="channel.locked"/>
        </td>
        <td class="state-channels-table__data">
          <block-time-cell
            :height="channel.updatedHeight"
            :timestamp="channel.updated"/>
        </td>
        <td class="state-channels-table__data">
          {{ channel.lastTxType }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

defineProps({
  stateChannels: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.state-channels-table {
  margin-bottom: var(--space-4);

  &__data {
    white-space: nowrap;
  }
}
</style>
