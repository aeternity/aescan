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
        <td class="names-expired-table__data">
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td class="names-expired-table__data">
          <block-time-cell
            :height="name.expirationHeight"
            :timestamp="name.expiration"/>
        </td>
        <td class="names-expired-table__data">
          <value-hash-ellipsed
            v-if="name.lastBuyer"
            :hash="name.lastBuyer"
            :link-to="`/accounts/${name.lastBuyer}`"/>
        </td>
        <td class="names-expired-table__data">
          <price-label
            class="names-expired-table__price-label"
            :price="name.fee"/>
        </td>
        <td class="names-expired-table__data">
          <value-hash-ellipsed
            :hash="name.lastOwner"
            :link-to="`/accounts/${name.lastOwner}`"/>
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
.names-expired-table {
  &__price-label {
    margin-top: var(--space-0);
  }

  &__data {
    white-space: nowrap;
  }

  &__pointer {
    display: block;
  }
}
</style>
