<template>
  <table class="names-in-auction-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Ends</time-toggle-button>
          <hint-tooltip>
            {{ namesHints.ends }}
          </hint-tooltip>
        </th>
        <th>
          Highest Bid
          <hint-tooltip>
            {{ namesHints.highestBid }}
          </hint-tooltip>
        </th>
        <th>
          Highest Bidder
          <hint-tooltip>
            {{ namesHints.highestBidder }}
          </hint-tooltip>
        </th>
        <th>
          Bid Count
          <hint-tooltip>
            {{ namesHints.bidCount }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in names.data"
        :key="name.name">
        <td class="names-in-auction-table__data">
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td class="names-in-auction-table__data">
          <block-time-cell
            :height="name.expirationHeight"
            :timestamp="name.expiration"/>
        </td>
        <td class="names-in-auction-table__data">
          <price-label
            :price="name.bid"
            class="names-in-auction-table__price-label"/>
        </td>
        <td class="names-in-auction-table__data">
          <div>
            <value-hash-ellipsed
              :hash="name.highestBidder"
              :link-to="`/accounts/${name.highestBidder}`"/>
          </div>
        </td>
        <td class="names-in-auction-table__data">
          {{ name.bidCount }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.names-in-auction-table {
  &__price-label {
    margin-top: var(--space-0);
  }
}
</style>
