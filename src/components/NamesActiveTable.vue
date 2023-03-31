<template>
  <div>
    <table class="names-active-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Expires</th>
          <th>Buyer</th>
          <th>Owner</th>
          <th>Points to</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="name in names?.data"
          :key="name.name">
          <td class="names-active-table__column">
            <app-link :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
          <td class="names-active-table__column">
            <div class="names-active-table__expiration-height">
              {{ name.expirationHeight }}
            </div>
            <datetime-label :datetime="name.expiration"/>
          </td>
          <td class="names-active-table__column">
            <div>
              <value-hash-ellipsed
                :hash="name.buyer"
                :link-to="`/accounts/${name.buyer}`"/>
            </div>
            <app-chip
              variant="secondary"
              class="names-active-table__price-label">
              {{ formatAePrice(name.fee) }}
            </app-chip>
          </td>
          <td class="names-active-table__column">
            <value-hash-ellipsed
              :hash="name.owner"
              :link-to="`/accounts/${name.owner}`"/>
          </td>
          <td>
            <value-hash-ellipsed
              v-for="pointer in name.pointers"
              :key="pointer"
              class="names-active-table__pointer"
              :hash="pointer"
              :link-to="`/accounts/${pointer}`"/>
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
  name: 'NamesActiveTable',
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
.names-active-table {
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

  &__expiration-height {
    font-weight: 600;
  }
}
</style>
