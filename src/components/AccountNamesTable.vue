<template>
  <table>
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ accountHints.name }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Expires</time-toggle-button>
          <hint-tooltip>
            {{ accountHints.expires }}
          </hint-tooltip>
        </th>
        <th>
          Points To
          <hint-tooltip>
            {{ accountHints.pointsTo }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in accountNames.data"
        :key="name.name">
        <td class="account-names-table__data">
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td class="account-names-table__data">
          <block-time-cell
            :height="name.expirationHeight"
            :timestamp="name.expiration"/>
        </td>
        <td class="account-names-table__data">
          <value-hash-ellipsed
            v-for="pointer in name.pointers"
            :key="pointer"
            class="account-names-table__pointer"
            :hash="pointer"
            :link-to="`/accounts/${pointer}`"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { accountHints } from '@/utils/hints/accountHints'

defineProps({
  accountNames: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-names-table {
  &__pointer {
    display: block;
  }

  &__data {
    white-space: nowrap;
  }
}
</style>
