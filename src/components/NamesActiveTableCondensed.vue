<template>
  <div class="names-active-table-condensed">
    <table
      v-for="name of names?.data"
      :key="name.name"
      class="names-active-table-condensed__table">
      <tbody>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ namesHints.name }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-active-table-condensed__data">
            <app-link
              class="names-active-table-condensed__name u-ellipsis"
              :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <app-tooltip>
              Expires
              <template #tooltip>
                {{ namesHints.expires }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-active-table-condensed__data">
            <div>
              {{ name.expirationHeight }}
            </div>
            <datetime-label :datetime="name.expiration"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <app-tooltip>
              Buyer
              <template #tooltip>
                {{ namesHints.buyer }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-active-table-condensed__data">
            <value-hash-ellipsed
              v-if="name.buyer"
              :hash="name.buyer"
              :link-to="`/accounts/${name.buyer}`"
              class="names-active-table-condensed__buyer"/>
            <app-chip variant="secondary">
              {{ formatAePrice(name.fee) }}
            </app-chip>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <app-tooltip>
              Owner
              <template #tooltip>
                {{ namesHints.owner }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-active-table-condensed__data">
            <value-hash-ellipsed
              :hash="name.owner"
              :link-to="`/accounts/${name.owner}`"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <app-tooltip>
              Points to
              <template #tooltip>
                {{ namesHints.pointsTo }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-active-table-condensed__data">
            <template v-if="name.pointers.length > 0">
              <value-hash-ellipsed
                v-for="pointer in name.pointers"
                :key="pointer"
                :hash="pointer"
                :link-to="`/accounts/${pointer}`"
                class="names-active-table-condensed__pointer"/>
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
import { namesHints } from '../utils/hints/namesHints'
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import DatetimeLabel from '@/components/DatetimeLabel'
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
.names-active-table-condensed {
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
    min-width: 80px;
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }

  &__pointer {
    display: block;
  }

  &__data {
    text-align: right;
  }

  &__buyer {
    margin-right: var(--space-2);
  }
}
</style>
