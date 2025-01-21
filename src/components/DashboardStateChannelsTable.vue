<template>
  <table>
    <thead>
      <tr>
        <th>
          State Channel ID
          <hint-tooltip>
            {{ stateChannelsHints.stateChannelId }}
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
        v-for="channel in stateChannels"
        :key="channel.channel">
        <td>
          <value-hash-ellipsed
            :link-to="`/state-channels/${channel.channel}`"
            :hash="channel.channel"/>
        </td>
        <td>
          <div>
            <span class="dashbaord-state-channels-table__label">
              Initiator:
            </span>

            <value-hash-ellipsed
              :link-to="`/accounts/${channel.initiator}`"
              :hash="channel.initiator"/>
          </div>
          <div>
            <span class="dashbaord-state-channels-table__label">
              Responder:
            </span>
            <value-hash-ellipsed
              :link-to="`/accounts/${channel.responder}`"
              :hash="channel.responder"/>
          </div>
        </td>
        <td>
          {{ channel.updateCount }}
        </td>
        <td>
          <price-label :price="channel.amount"/>
        </td>
        <td>
          <block-time-cell
            :height="channel.updatedHeight"
            :timestamp="channel.updated"/>
        </td>
        <td>{{ channel.lastTxType }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
</script>

<style scoped>
.dashbaord-state-channels-table {
  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }
}
</style>
