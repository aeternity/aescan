<template>
  <table class="names-expired-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Expired</th>
        <th>Last buyer</th>
        <th>Last owner</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in names?.data"
        :key="name.name">
        <td class="names-expired-table__column">
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td class="names-expired-table__column">
          <div>
            {{ name.expirationHeight }}
          </div>
          <div>
            <datetime-label :datetime="name.expiration"/>
          </div>
        </td>
        <td class="names-expired-table__column">
          <div>
            <value-hash-ellipsed
              v-if="name.lastBuyer"
              :hash="name.lastBuyer"
              :link-to="`/accounts/${name.lastBuyer}`"/>
          </div>
          <app-chip
            variant="secondary"
            class="names-expired-table__price-label">
            {{ formatAePrice(name.fee) }}
          </app-chip>
        </td>
        <td>
          <value-hash-ellipsed
            :hash="name.lastOwner"
            :link-to="`/accounts/${name.lastOwner}`"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'NamesExpiredTable',
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
.names-expired-table {
  &__column {
    width: 210px;
  }

  &__price-label {
    font-weight: 700;
    margin-top: var(--space-0);
  }

  &__pointer {
    display: block;
  }
}
</style>
