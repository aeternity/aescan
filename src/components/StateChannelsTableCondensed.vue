<template>
  <div class="state-channels-table-condensed">
    <table
      v-for="channel in stateChannels.data"
      :key="channel.id"
      class="state-channels-table-condensed__table">
      <tbody>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            State Channel ID
            <hint-tooltip>
              {{ stateChannelsHints.stateChannelId }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            <value-hash-ellipsed
              :hash="channel.id"
              :link-to="`/state-channels/${channel.id}`"/>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Status
            <hint-tooltip>
              {{ stateChannelsHints.status }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.status }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Participants
            <hint-tooltip>
              {{ stateChannelsHints.participants }}
            </hint-tooltip>
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
            On-Chain Updates
            <hint-tooltip>
              {{ stateChannelsHints.onChainUpdates }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.updateCount }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Locked
            <hint-tooltip>
              {{ stateChannelsHints.locked }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.locked }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Last Known Round
            <hint-tooltip>
              {{ stateChannelsHints.lastKnownRound }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.lastRound }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Last Updated
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            <div>
              {{ channel.updatedHeight }}
            </div>
            <div>
              <datetime-label :datetime="channel.updated "/>
            </div>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            Last TX type
            <hint-tooltip>
              {{ stateChannelsHints.lastTxType }}
            </hint-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.updateType }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { stateChannelsHints } from '~/utils/hints/stateChannelsHints'

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
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
