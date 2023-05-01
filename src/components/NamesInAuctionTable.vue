<template>
  <table class="names-in-auction-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Expires</th>
        <th>Highest Bid</th>
        <th>Bid Count</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in names?.data"
        :key="name.name">
        <td class="names-in-auction-table__column">
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td class="names-in-auction-table__column">
          <div>
            {{ name.expirationHeight }}
          </div>
          <div>
            <datetime-label :datetime="name.expiration"/>
          </div>
        </td>
        <td class="names-in-auction-table__column">
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

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.names-in-auction-table {
  &__column {
    width: 210px;
  }

  &__price-label {
    font-weight: 700;
    margin-top: var(--space-0);
  }
}
</style>
