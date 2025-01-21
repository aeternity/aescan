<template>
  <app-swiper :slides="auctionsEndingSoon">
    <template #slide="{ slideData: auction }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-auctions-swiper__header">
              <hint-tooltip>
                {{ namesHints.nameId }}
              </hint-tooltip>
              Name
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
              <hint-tooltip>
                {{ namesHints.bidder }}
              </hint-tooltip>
              Highest Bidder
            </th>
            <td class="dashboard-auctions-swiper__data">
              <value-hash-ellipsed
                :hash="auction.highestBidder"
                :link-to="`/accounts/${auction.highestBidder}`"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-auctions-swiper__header">
              <hint-tooltip>
                {{ namesHints.bid }}
              </hint-tooltip>
              Bid
            </th>
            <td class="dashboard-auctions-swiper__data">
              <price-label :price="auction.bid"/>
            </td>
          </tr>
          <tr>
            <th>
              <hint-tooltip>
                {{ namesHints.ends }}
              </hint-tooltip>
              <time-toggle-button class="dashboard-auctions-swiper__button">
                Ending
              </time-toggle-button>
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
import { useNamesStore } from '@/stores/names'
import { namesHints } from '@/utils/hints/namesHints'

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

  &__button {
    margin-left: 3px;
  }
}
</style>
