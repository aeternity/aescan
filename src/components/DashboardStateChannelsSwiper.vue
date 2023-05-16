<template>
  <app-swiper :slides="stateChannels">
    <template #slide="{ slideData: channel }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
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
              On-chain updates
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.updateCount }}
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              Locked
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ formatAePrice(channel.amount) }}
            </td>
          </tr>
          <tr>
            <th class="dashboard-state-channels-swiper__header">
              Last updated
            </th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.updatedHeight }} -
              <datetime-label :datetime="channel.updated"/>
            </td>
          </tr>
          <tr>
            <th>Type</th>
            <td class="dashboard-state-channels-swiper__data">
              {{ channel.updateType }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>
<script>
import { mapState } from 'pinia'
import { useDashboardStateChannelsStore } from '@/stores/dashboardStateChannels'
import { formatAePrice } from '@/utils/format'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'StateChannelsSwiper',
  components: { DatetimeLabel, ValueHashEllipsed, AppSwiper },

  computed: {
    ...mapState(useDashboardStateChannelsStore, ['stateChannels']),
  },

  methods: {
    formatAePrice,
  },
}
</script>

<style scoped>
.dashboard-state-channels-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
  }
}
</style>
