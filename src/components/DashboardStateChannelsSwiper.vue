<template>
  <app-swiper :slides="stateChannels">
    <template #slide="{ slideData: channel }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                State Channel ID
                <template #tooltip>
                  {{ stateChannelsHints.stateChannelId }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/state-channels/${channel.channel}`"
                :hash="channel.channel"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                Initiator
                <template #tooltip>
                  {{ stateChannelsHints.initiator }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${channel.initiator}`"
                :hash="channel.initiator"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                Responder
                <template #tooltip>
                  {{ stateChannelsHints.responder }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${channel.responder}`"
                :hash="channel.responder"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                On-Chain TXs
                <template #tooltip>
                  {{ stateChannelsHints.onChainUpdates }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.updateCount }}
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                Locked
                <template #tooltip>
                  {{ stateChannelsHints.locked }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ formatAePrice(channel.amount) }}
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <app-tooltip>
                <time-switch-button>Last Updated</time-switch-button>
                <template #tooltip>
                  {{ stateChannelsHints.lastUpdated }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <app-link
                :to="`/keyblocks/${channel.updatedHeight}`">
                {{ channel.updatedHeight }}
              </app-link>
              -
              <datetime-label :datetime="channel.updated"/>
            </td>
          </tr>
          <tr>
            <th>
              <app-tooltip>
                Last TX Type
                <template #tooltip>
                  {{ stateChannelsHints.lastTxType }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.lastTxType }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDashboardStateChannelsStore } from '@/stores/dashboardStateChannels'
import { formatAePrice } from '@/utils/format'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
</script>

<style scoped>
.dashboard-state-channels-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: right;
  }
}
</style>
