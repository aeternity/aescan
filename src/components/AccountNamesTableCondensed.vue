<template>
  <div>
    <table
      v-for="name in accountNames.data"
      :key="name.name"
      class="account-names-table-condensed__table">
      <tbody>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            <hint-tooltip>
              {{ accountHints.name }}
            </hint-tooltip>
            Name
          </th>
          <td class="account-names-table-condensed__data">
            <app-link
              :to="`/names/${name.name}`"
              class="account-names-table-condensed__name u-ellipsis">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            <hint-tooltip>
              {{ accountHints.expires }}
            </hint-tooltip>
            <time-toggle-button>Expires</time-toggle-button>
          </th>
          <td class="account-names-table-condensed__data">
            <block-time-cell
              :height="name.expirationHeight"
              :timestamp="name.expiration"/>
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            <hint-tooltip>
              {{ accountHints.pointsTo }}
            </hint-tooltip>
            Points To
          </th>
          <td class="account-names-table-condensed__data">
            <template v-if="name.pointers.length">
              <value-hash-ellipsed
                v-for="pointer in name.pointers"
                :key="pointer"
                class="account-names-table-condensed__pointer"
                :hash="pointer"
                :link-to="`/accounts/${pointer}`"/>
            </template>
            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { accountHints } from '@/utils/hints/accountHints'

defineProps({
  accountNames: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-names-table-condensed {
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
    display: inline-block;
    max-width: 160px;
  }

  &__pointer {
    display: block;
  }
}
</style>
