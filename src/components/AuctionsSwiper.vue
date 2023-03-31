<template>
  <app-swiper :slides="auctionsEndingSoon">
    <template #slide="{ slideData: auction }">
      <table>
        <tbody>
          <tr>
            <th class="auctions-swiper__header">
              Name
            </th>
            <td class="auctions-swiper__data">
              <app-link
                :to="`/names/${auction.name}`"
                class="auctions-swiper__name u-ellipsis">
                {{ auction.name }}
              </app-link>
            </td>
          </tr>
          <tr>
            <th class="auctions-swiper__header">
              Last bid by
            </th>
            <td class="auctions-swiper__data">
              <value-hash-ellipsed
                :hash="auction.highestBidder"
                :link-to="`/accounts/${auction.highestBidder}`"/>
            </td>
          </tr>
          <tr>
            <th class="auctions-swiper__header">
              Bid
            </th>
            <td class="auctions-swiper__data">
              {{ formatAePrice(auction.bid) }}
            </td>
          </tr>
          <tr>
            <th>Ending</th>
            <td class="auctions-swiper__data">
              {{ auction.expirationHeight }} -
              <datetime-label :datetime="auction.expiration"/>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>
<script>
import { mapState } from 'pinia'
import AppLink from '@/components/AppLink'

import { useNamesStore } from '@/stores/names'
import { formatAePrice } from '@/utils/format'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'AuctionsSwiper',
  components: { DatetimeLabel, ValueHashEllipsed, AppSwiper, AppLink },

  computed: {
    ...mapState(useNamesStore, ['auctionsEndingSoon']),
    ...mapState(useRecentBlocksStore, ['blockHeight']),
  },

  methods: {
    formatAePrice,
  },
}
</script>

<style scoped>
.auctions-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }
}
</style>
