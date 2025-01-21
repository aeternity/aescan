<template>
  <table>
    <thead>
      <tr>
        <th>
          Data
          <hint-tooltip>
            {{ namesHints.nameAndHighestBidder }}
          </hint-tooltip>
        </th>
        <th>
          Highest Bid
          <hint-tooltip>
            {{ namesHints.bid }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Expires</time-toggle-button>
          <hint-tooltip>
            {{ namesHints.ends }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="auction in auctionsEndingSoon"
        :key="auction.name">
        <td>
          <div>
            <span class="dashboard-auctions-table__label">Name:</span>
            <app-link
              :to="`/names/${auction.name}`"
              class="dashboard-auctions-table__chain-name u-ellipsis">
              {{ auction.name }}
            </app-link>
          </div>
          <div>
            <span class="dashboard-auctions-table__label">Highest Bidder: </span>
            <value-hash-ellipsed
              :link-to="`/accounts/${auction.highestBidder}`"
              :hash="auction.highestBidder"/>
          </div>
        </td>
        <td>
          <price-label :price="auction.bid"/>
        </td>
        <td>
          <div class="dashboard-auctions-table__blocks">
            <block-time-cell
              :height="auction.expirationHeight"
              :timestamp="auction.expiration"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'

const { auctionsEndingSoon } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-auctions-table {
  &__chain-name {
    display: inline-block;
    width: 160px;
  }

  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }

  &__blocks {
    margin-bottom: var(--space-0);
  }
}
</style>
