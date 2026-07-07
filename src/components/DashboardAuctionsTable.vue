<template>
  <table class="dashboard-auctions-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
        </th>
        <th>
          Top Bidder
          <hint-tooltip>
            {{ namesHints.highestBidder }}
          </hint-tooltip>
        </th>
        <th>
          Current Bid
          <hint-tooltip>
            {{ namesHints.bid }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Ends</time-toggle-button>
          <hint-tooltip>
            {{ namesHints.ends }}
          </hint-tooltip>
        </th>
        <th>
          Block
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="auction in auctionsEndingSoon"
        :key="auction.name">
        <td class="dashboard-auctions-table__data">
          <app-link
            :to="`/names/${auction.name}`"
            class="dashboard-auctions-table__chain-name u-ellipsis">
            {{ auction.name }}
          </app-link>
        </td>
        <td class="dashboard-auctions-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${auction.highestBidder}`"
            :hash="auction.highestBidder"/>
        </td>
        <td class="dashboard-auctions-table__data">
          <price-label :price="auction.bid"/>
        </td>
        <td class="dashboard-auctions-table__data">
          <timestamp-label :timestamp="auction.expiration"/>
        </td>
        <td class="dashboard-auctions-table__data">
          <app-link :to="`/keyblocks/${auction.expirationHeight}`">
            {{ auction.expirationHeight }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const { auctionsEndingSoon } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-auctions-table {
  &__chain-name {
    display: inline-block;
    max-width: 160px;
  }

  &__data {
    white-space: nowrap;
  }
}
</style>
