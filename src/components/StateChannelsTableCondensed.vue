<template>
  <div>
    <table
      v-for="channel in stateChannels.data"
      :key="channel.id"
      class="state-channels-table-condensed__table">
      <tbody>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              State Channel ID
              <template #tooltip>
                {{ stateChannelsHints.stateChannelId }}
              </template>
            </app-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            <value-hash-ellipsed
              :hash="channel.id"
              :link-to="`/state-channels/${channel.id}`"/>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              Status
              <template #tooltip>
                {{ stateChannelsHints.status }}
              </template>
            </app-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.status }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              Participants
              <template #tooltip>
                {{ stateChannelsHints.participants }}
              </template>
            </app-tooltip>
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
            <app-tooltip>
              On-Chain TXs
              <template #tooltip>
                {{ stateChannelsHints.onChainUpdates }}
              </template>
            </app-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.updateCount }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              Locked
              <template #tooltip>
                {{ stateChannelsHints.locked }}
              </template>
            </app-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            {{ channel.locked }}
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              Last Updated
              <template #tooltip>
                {{ stateChannelsHints.lastUpdated }}
              </template>
            </app-tooltip>
          </th>
          <td class="state-channels-table-condensed__data">
            <div>
              <app-link
                :to="`/keyblocks/${channel.lastUpdatedHeight}`">
                {{ channel.lastUpdatedHeight }}
              </app-link>
            </div>
            <div>
              <datetime-label :datetime="channel.lastUpdated"/>
            </div>
          </td>
        </tr>
        <tr class="state-channels-table-condensed__row">
          <th class="state-channels-table-condensed__header">
            <app-tooltip>
              Last TX Type
              <template #tooltip>
                {{ stateChannelsHints.lastTxType }}
              </template>
            </app-tooltip>
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
}
</style>
