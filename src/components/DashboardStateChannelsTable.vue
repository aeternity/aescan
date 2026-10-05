<template>
  <table class="dashboard-state-channels-table">
    <thead>
      <tr>
        <th>
          Status
        </th>
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
          <time-toggle-button>Last Update</time-toggle-button>
          <hint-tooltip>
            {{ stateChannelsHints.lastUpdate }}
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
          <span
            :class="[
              'dashboard-state-channels-table__status',
              {'dashboard-state-channels-table__status--closed': !channel.isActive},
            ]">
            {{ channel.isActive ? 'Open' : 'Closed' }}
          </span>
        </td>
        <td>
          <value-hash-ellipsed
            :link-to="`/state-channels/${channel.channel}`"
            :hash="channel.channel"/>
        </td>
        <td>
          <div>
            <span class="dashboard-state-channels-table__label">
              Initiator:
            </span>

            <value-hash-ellipsed
              :link-to="`/accounts/${channel.initiator}`"
              :hash="channel.initiator"/>
          </div>
          <div>
            <span class="dashboard-state-channels-table__label">
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
        <td>
          <span class="dashboard-state-channels-table__tx-type">
            {{ channel.lastTxType }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
</script>

<style scoped>
.dashboard-state-channels-table {
  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
    font-size: 12px;
    color: var(--text-faint);
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;
    color: var(--up);

    &:before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentcolor;
      box-shadow: 0 0 0 3px var(--up-soft);
    }

    &--closed {
      color: var(--text-faint);

      &:before {
        box-shadow: none;
      }
    }
  }

  &__tx-type {
    display: inline-block;
    padding: 3px 9px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--c-teal);
    background: var(--up-soft);
    border-radius: 6px;
  }
}
</style>
