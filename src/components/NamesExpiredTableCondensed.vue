<template>
  <div>
    <table
      v-for="name in names.data"
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
              <time-toggle-button>Expired</time-toggle-button>
              <template #tooltip>
                {{ namesHints.expired }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <block-time-cell
              :height="name.expirationHeight"
              :timestamp="name.expiration"/>
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Last Buyer
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
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Last Price
              <template #tooltip>
                {{ namesHints.lastPrice }}
              </template>
            </app-tooltip>
          </th>
          <td class="names-expired-table-condensed__data">
            <price-label :price="name.fee"/>
          </td>
        </tr>
        <tr class="names-expired-table-condensed__row">
          <th class="names-expired-table-condensed__header">
            <app-tooltip>
              Last Owner
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
import AppLink from '@/components/AppLink'
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
.names-expired-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
    min-width: 120px;
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }

  &__last-buyer {
    margin-right: var(--space-2);
  }
}
</style>
