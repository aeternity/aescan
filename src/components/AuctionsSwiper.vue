<template>
  <app-swiper :slides="auctionsEndingSoon">
    <template #slide="{ slideData: auction }">
      <table>
        <tbody>
          <tr>
            <th class="auctions-swiper__header">
              <app-tooltip>
                Name
                <template #tooltip>
                  {{ namesHints.name }}
                </template>
              </app-tooltip>
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
              <app-tooltip>
                Highest bidder
                <template #tooltip>
                  {{ namesHints.bidder }}
                </template>
              </app-tooltip>
            </th>
            <td class="auctions-swiper__data">
              <value-hash-ellipsed
                :hash="auction.highestBidder"
                :link-to="`/accounts/${auction.highestBidder}`"/>
            </td>
          </tr>
          <tr>
            <th class="auctions-swiper__header">
              <app-tooltip>
                Bid
                <template #tooltip>
                  {{ namesHints.bid }}
                </template>
              </app-tooltip>
            </th>
            <td class="auctions-swiper__data">
              {{ formatAePrice(auction.bid) }}
            </td>
          </tr>
          <tr>
            <th>
              <app-tooltip>
                Ending
                <template #tooltip>
                  {{ namesHints.ends }}
                </template>
              </app-tooltip>
            </th>
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

<script setup>
import { storeToRefs } from 'pinia'
import AppLink from '@/components/AppLink'
import { useNamesStore } from '@/stores/names'
import { formatAePrice } from '@/utils/format'
import { namesHints } from '@/utils/hints/namesHints'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

const { auctionsEndingSoon } = storeToRefs(useNamesStore())
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
