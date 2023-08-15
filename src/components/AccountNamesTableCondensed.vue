<template>
  <div class="account-names-table-condensed">
    <table
      v-for="name in accountNames?.data"
      :key="name.name"
      class="account-names-table-condensed__table">
      <tbody>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ accountHints.name }}
              </template>
            </app-tooltip>
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
            <app-tooltip>
              Expires
              <template #tooltip>
                {{ accountHints.expires }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-names-table-condensed__data">
            <div>
              <app-link
                :to="`/keyblocks/${name.expirationHeight}`">
                {{ name.expirationHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="name.expires"/>
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            <app-tooltip>
              Points To
              <template #tooltip>
                {{ accountHints.pointsTo }}
              </template>
            </app-tooltip>
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
import AppTooltip from '@/components/AppTooltip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
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
    border-bottom: 1.5px solid var(--color-midnight-25);
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
