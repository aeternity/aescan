<template>
  <div class="names-in-auction-table-condensed">
    <table
      v-for="name in names?.data"
      :key="name.name"
      class="names-in-auction-table-condensed__table">
      <tbody>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            Name
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
            Expires
          </th>
          <td class="names-in-auction-table-condensed__data">
            {{ name.expirationHeight }} -
            <datetime-label :datetime="name.expiration"/>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            Highest Bid
          </th>
          <td class="names-in-auction-table-condensed__data">
            <value-hash-ellipsed
              :hash="name.highestBidder"
              :link-to="`/accounts/${name.highestBidder}`"/>
            <app-chip variant="secondary">
              {{ formatAePrice(name.bid) }}
            </app-chip>
          </td>
        </tr>
        <tr class="names-in-auction-table-condensed__row">
          <th class="names-in-auction-table-condensed__header">
            Bid Count
          </th>
          <td class="names-in-auction-table-condensed__data">
            {{ name.bidCount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'NamesInAuctionTableCondensed',
  components: {
    DatetimeLabel,
    ValueHashEllipsed,
    AppChip,
    AppLink,
  },
  props: {
    names: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatAePrice,
  },
}
</script>

<style scoped>
.names-in-auction-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: var(--space-1);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-2);
    min-width: 120px;
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }

  &__data {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-0) var(--space-2);
    flex-wrap: wrap;
    font-family: var(--font-monospaced);
  }
}
</style>
