<template>
  <app-swiper :slides="stateChannels">
    <template #slide="{slideData: channel}">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.stateChannelId }}
              </hint-tooltip>
              State Channel ID
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/state-channels/${channel.channel}`"
                :hash="channel.channel"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.initiator }}
              </hint-tooltip>
              Initiator
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${channel.initiator}`"
                :hash="channel.initiator"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.responder }}
              </hint-tooltip>
              Responder
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${channel.responder}`"
                :hash="channel.responder"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.onChainUpdates }}
              </hint-tooltip>
              On-Chain TXs
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.updateCount }}
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.locked }}
              </hint-tooltip>
              Locked
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <price-label
                :price="channel.amount"
                class="dashboard-state-channels-swiper__price"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              <hint-tooltip>
                {{ stateChannelsHints.lastUpdate }}
              </hint-tooltip>
              <time-toggle-button class="dashboard-state-channels-swiper__button">
                Last Update
              </time-toggle-button>
            </th>
            <td class="dashboard-state-channels-swiper__data">
              <app-link
                :to="`/keyblocks/${channel.updatedHeight}`">
                {{ channel.updatedHeight }}
              </app-link>
              -
              <timestamp-label :timestamp="channel.updated"/>
            </td>
          </tr>
          <tr>
            <th>
              <hint-tooltip>
                {{ stateChannelsHints.lastTxType }}
              </hint-tooltip>
              Last TX Type
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
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
</script>

<style scoped>
.dashboard-state-channels-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__price {
    justify-content: flex-end;
  }

  &__data {
    text-align: right;
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
