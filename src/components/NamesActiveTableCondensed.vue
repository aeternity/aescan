<template>
  <div>
    <table
      v-for="name of names.data"
      :key="name.name"
      class="names-active-table-condensed__table">
      <tbody>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <hint-tooltip>
              {{ namesHints.nameId }}
            </hint-tooltip>
            Name
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
            <hint-tooltip>
              {{ namesHints.expires }}
            </hint-tooltip>
            <time-toggle-button>Expires</time-toggle-button>
          </th>
          <td class="names-active-table-condensed__data">
            <block-time-cell
              :height="name.expirationHeight"
              :timestamp="name.expiration"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <hint-tooltip>
              {{ namesHints.buyer }}
            </hint-tooltip>
            Buyer
          </th>
          <td class="names-active-table-condensed__data">
            <value-hash-ellipsed
              v-if="name.buyer"
              :hash="name.buyer"
              :link-to="`/accounts/${name.buyer}`"
              class="names-active-table-condensed__buyer"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <hint-tooltip>
              {{ namesHints.price }}
            </hint-tooltip>
            Price
          </th>
          <td class="names-active-table-condensed__data">
            <price-label :price="name.fee"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <hint-tooltip>
              {{ namesHints.owner }}
            </hint-tooltip>
            Owner
          </th>
          <td class="names-active-table-condensed__data">
            <value-hash-ellipsed
              :hash="name.owner"
              :link-to="`/accounts/${name.owner}`"/>
          </td>
        </tr>
        <tr class="names-active-table-condensed__row">
          <th class="names-active-table-condensed__header">
            <hint-tooltip>
              {{ namesHints.pointsTo }}
            </hint-tooltip>
            Points To
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
import { namesHints } from '@/utils/hints/namesHints'
import AppLink from '@/components/AppLink'
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
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
    min-width: 80px;
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

  &__pointer {
    display: block;
  }

  &__buyer {
    margin-right: var(--space-2);
  }
}
</style>
