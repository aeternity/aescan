<template>
  <div>
    <table class="names-active-table">
      <thead>
        <tr>
          <th>
            Name
            <hint-tooltip>
              {{ namesHints.name }}
            </hint-tooltip>
          </th>
          <th>
            Expire Height
            <hint-tooltip>
              {{ namesHints.expireHeight }}
            </hint-tooltip>
          </th>
          <th>
            Expire Time
            <hint-tooltip>
              {{ namesHints.expire }}
            </hint-tooltip>
          </th>
          <th>
            Buyer
            <hint-tooltip>
              {{ namesHints.buyer }}
            </hint-tooltip>
          </th>
          <th>
            Price
            <hint-tooltip>
              {{ namesHints.price }}
            </hint-tooltip>
          </th>
          <th>
            Owner
            <hint-tooltip>
              {{ namesHints.owner }}
            </hint-tooltip>
          </th>
          <th>
            Points To
            <hint-tooltip>
              {{ namesHints.pointsTo }}
            </hint-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="name in names.data"
          :key="name.name">
          <td>
            <app-link :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
          <td>
            <keyblock-link :height="name.expirationHeight"/>
          </td>
          <td>
            <datetime-label :datetime="name.expiration"/>
          </td>
          <td>
            <value-hash-ellipsed
              :hash="name.buyer"
              :link-to="`/accounts/${name.buyer}`"/>
          </td>
          <td>
            <app-chip
              variant="secondary"
              class="names-active-table__price-label">
              {{ formatAePrice(name.fee) }}
            </app-chip>
          </td>
          <td>
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

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.names-active-table {
  &__price-label {
    font-weight: 700;
    margin-top: var(--space-0);
  }

  &__pointer {
    display: block;
  }
}
</style>
