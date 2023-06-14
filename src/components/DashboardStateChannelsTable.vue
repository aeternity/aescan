<template>
  <table>
    <thead>
      <tr>
        <th>State Channel ID</th>
        <th>Participants</th>
        <th>On-chain Updates</th>
        <th>Locked</th>
        <th>Last Updated</th>
        <th>Last TX type</th>
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
          {{ formatAePrice(channel.amount) }}
        </td>
        <td>
          <div>
            {{ channel.updatedHeight }}
          </div>
          <div>
            <datetime-label :datetime="channel.updated"/>
          </div>
        </td>
        <td>{{ channel.updateType }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDashboardStateChannelsStore } from '@/stores/dashboardStateChannels'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

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
