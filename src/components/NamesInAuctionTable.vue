<template>
  <table class="names-in-auction-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.nameInAuction }}
          </hint-tooltip>
        </th>
        <th>
          Ends
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
          Bid Count
          <hint-tooltip>
            {{ namesHints.bidCount }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in names?.data"
        :key="name.name">
        <td>
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td>
          <div>
            {{ name.expirationHeight }}
          </div>
          <div>
            <datetime-label :datetime="name.expiration"/>
          </div>
        </td>
        <td>
          <div>
            <value-hash-ellipsed
              :hash="name.highestBidder"
              :link-to="`/accounts/${name.highestBidder}`"/>
          </div>
          <app-chip
            variant="secondary"
            class="names-in-auction-table__price-label">
            {{ formatAePrice(name.bid) }}
          </app-chip>
        </td>
        <td>
          {{ name.bidCount }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { namesHints } from '~/utils/hints/namesHints'

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
    font-weight: 700;
    margin-top: var(--space-0);
  }
}
</style>
