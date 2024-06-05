<template>
  <table class="names-expired-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Expired</time-toggle-button>
          <hint-tooltip>
            {{ namesHints.expired }}
          </hint-tooltip>
        </th>
        <th>
          Last Buyer
          <hint-tooltip>
            {{ namesHints.lastBuyer }}
          </hint-tooltip>
        </th>
        <th>
          Last Price
          <hint-tooltip>
            {{ namesHints.lastPrice }}
          </hint-tooltip>
        </th>
        <th>
          Last Owner
          <hint-tooltip>
            {{ namesHints.lastOwner }}
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
          <block-time-cell
            :height="name.expirationHeight"
            :timestamp="name.expiration"/>
        </td>
        <td>
          <value-hash-ellipsed
            v-if="name.lastBuyer"
            :hash="name.lastBuyer"
            :link-to="`/accounts/${name.lastBuyer}`"/>
        </td>
        <td>
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
.names-expired-table {
  &__price-label {
    font-weight: 700;
    margin-top: var(--space-0);
  }

  &__pointer {
    display: block;
  }
}
</style>
