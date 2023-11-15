<template>
  <div>
    <table
      v-for="name in names.data"
      :key="name.name"
      class="names-in-auction-table-condensed__table">
      <tbody>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ namesHints.nameInAuction }}
              </template>
            </app-tooltip>
          </th>
          <td
            class="names-in-auction-table-condensed__data">
            <app-link
              class="names-in-auction-table-condensed__name u-ellipsis"
              :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            <app-tooltip>
              End Height
              <template #tooltip>
                {{ namesHints.endHeight }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-in-auction-table-condensed__data">
            <keyblock-link :height="name.expirationHeight"/>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            <app-tooltip>
              End Time
              <template #tooltip>
                {{ namesHints.end }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-in-auction-table-condensed__data">
            <datetime-label :datetime="name.expiration"/>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            <app-tooltip>
              Highest Bid
              <template #tooltip>
                {{ namesHints.highestBid }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-in-auction-table-condensed__data">
            <value-hash-ellipsed
              :hash="name.highestBidder"
              :link-to="`/accounts/${name.highestBidder}`"
              class="names-in-auction-table-condensed__highest-bid"/>
            <app-chip variant="secondary">
              {{ formatAePrice(name.bid) }}
            </app-chip>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            <app-tooltip>
              Bid Count
              <template #tooltip>
                {{ namesHints.bidCount }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-in-auction-table-condensed__data">
            {{ name.bidCount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.names-in-auction-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }

  &__highest-bid {
    margin-right: var(--space-2);
  }
}
</style>
