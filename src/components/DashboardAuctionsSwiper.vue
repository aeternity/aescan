<template>
  <app-swiper :slides="auctionsEndingSoon">
    <template #slide="{ slideData: auction }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-auctions-swiper__header">
              <app-tooltip>
                Name
                <template #tooltip>
                  {{ namesHints.name }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-auctions-swiper__data">
              <app-link
                :to="`/names/${auction.name}`"
                class="dashboard-auctions-swiper__name u-ellipsis">
                {{ auction.name }}
              </app-link>
            </td>
          </tr>
          <tr>
            <th class="dashboard-auctions-swiper__header">
              <app-tooltip>
                Highest Bidder
                <template #tooltip>
                  {{ namesHints.bidder }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-auctions-swiper__data">
              <value-hash-ellipsed
                :hash="auction.highestBidder"
                :link-to="`/accounts/${auction.highestBidder}`"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-auctions-swiper__header">
              <app-tooltip>
                Bid
                <template #tooltip>
                  {{ namesHints.bid }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-auctions-swiper__data">
              {{ formatAePrice(auction.bid) }}
            </td>
          </tr>
          <tr>
            <th>
              <app-tooltip>
                <time-switch-button>Ending</time-switch-button>
                <template #tooltip>
                  {{ namesHints.ends }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-auctions-swiper__data">
              <app-link
                :to="`/keyblocks/${auction.expirationHeight}`">
                {{ auction.expirationHeight }}
              </app-link>
              -
              <timestamp-label :timestamp="auction.expiration"/>
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

const { auctionsEndingSoon } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-auctions-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
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
