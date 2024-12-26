<template>
  <div>
    <table
      v-for="channel in stateChannels.data"
      :key="channel.id"
      class="state-channels-table-condensed__table">
      <tbody>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.stateChannelId }}
            </hint-tooltip>
            State Channel ID
          </th>
          <td class="state-channels-table-condensed__data">
            <value-hash-ellipsed
              :hash="channel.id"
              :link-to="`/state-channels/${channel.id}`"/>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.status }}
            </hint-tooltip>
            Status
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.status }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.participants }}
            </hint-tooltip>

            Participants
          </th>
          <td class="state-channels-table-condensed__data">
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
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.onChainUpdates }}
            </hint-tooltip>
            On-Chain TXs
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.updateCount }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.locked }}
            </hint-tooltip>
            Locked
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.locked }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
            <time-toggle-button class="state-channels-table-condensed__button">
              Last Updated
            </time-toggle-button>
          </th>
          <td class="state-channels-table-condensed__data">
            <block-time-cell
              :height="channel.updatedHeight"
              :timestamp="channel.updated"/>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <hint-tooltip>
              {{ stateChannelsHints.lastTxType }}
            </hint-tooltip>
            Last TX Type
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.lastTxType }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.state-channels-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
