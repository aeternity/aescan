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
          Last Updated
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
        <td>
          <value-hash-ellipsed
            :hash="channel.id"
            :link-to="`/state-channels/${channel.id}`"/>
        </td>
        <td>{{ channel.status }}</td>
        <td>
          <div>
            Initiator:
            <value-hash-ellipsed
              :hash="channel.initiator"
              :link-to="`/accounts/${channel.initiator}`"/>
          </div>
          <div>
            Responder:
            <value-hash-ellipsed
              :hash="channel.responder"
              :link-to="`/accounts/${channel.responder}`"/>
          </div>
        </td>
        <td>{{ channel.updateCount }}</td>
        <td>{{ channel.locked }}</td>
        <td>
          <div>
            {{ channel.updatedHeight }}
          </div>
          <div>
            <datetime-label :datetime="channel.updated "/>
          </div>
        </td>
        <td>{{ channel.updateType }}</td>
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
  margin-bottom: var(--space-2);
}
</style>
