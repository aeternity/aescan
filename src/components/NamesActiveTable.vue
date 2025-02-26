<template>
  <div>
    <table class="names-active-table">
      <thead>
        <tr>
          <th>
            Name
            <hint-tooltip>
              {{ namesHints.nameId }}
            </hint-tooltip>
          </th>
          <th>
            <time-toggle-button>Expires</time-toggle-button>
            <hint-tooltip>
              {{ namesHints.expires }}
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
          <td class="names-active-table__data">
            <app-link :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
          <td class="names-active-table__data">
            <block-time-cell
              :height="name.expirationHeight"
              :timestamp="name.expiration"/>
          </td>
          <td class="names-active-table__data">
            <value-hash-ellipsed
              :hash="name.buyer"
              :link-to="`/accounts/${name.buyer}`"/>
          </td>
          <td class="names-active-table__data">
            <price-label
              class="names-active-table__price-label"
              :price="name.fee"/>
          </td>
          <td class="names-active-table__data">
            <value-hash-ellipsed
              :hash="name.owner"
              :link-to="`/accounts/${name.owner}`"/>
          </td>
          <td class="names-active-table__data">
            <template v-if="name.pointers.length > 0">
              <value-hash-ellipsed
                v-for="pointer in name.pointers"
                :key="pointer.id"
                class="names-active-table__pointer"
                :hash="pointer.id"
                :link-to="`/accounts/${pointer.id}`"/>
            </template>
            <not-available-label v-else/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.names-active-table {
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
