<template>
  <div class="names-expired-table-condensed">
    <table
      v-for="name in names?.data"
      :key="name.name"
      class="names-expired-table-condensed__table">
      <tbody>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ namesHints.name }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <app-link
              class="names-expired-table-condensed__name u-ellipsis"
              :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Expired
              <template #tooltip>
                {{ namesHints.expired }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <div>
              {{ name.expirationHeight }}
            </div>
            <datetime-label :datetime="name.expiration"/>
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Last buyer
              <template #tooltip>
                {{ namesHints.lastBuyer }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <value-hash-ellipsed
              v-if="name.lastBuyer"
              class="names-expired-table-condensed__last-buyer"
              :hash="name.lastBuyer"
              :link-to="`/accounts/${name.lastBuyer}`"/>
            <app-chip variant="secondary">
              {{ formatAePrice(name.fee) }}
            </app-chip>
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Last owner
              <template #tooltip>
                {{ namesHints.lastOwner }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <value-hash-ellipsed
              :hash="name.lastOwner"
              :link-to="`/accounts/${name.lastOwner}`"/>
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
import DatetimeLabel from '@/components/DatetimeLabel'
import { namesHints } from '~/utils/hints/namesHints'

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.names-expired-table-condensed {
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
    text-align: right;
  }

  &__last-buyer {
    margin-right: var(--space-2);
  }
}
</style>
