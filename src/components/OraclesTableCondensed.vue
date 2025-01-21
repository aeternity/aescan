<template>
  <div>
    <table
      v-for="oracle in oracles.data"
      :key="oracle.oracleId"
      class="oracles-table-condensed__table">
      <tbody>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <hint-tooltip>
              {{ oraclesHints.oracleId }}
            </hint-tooltip>
            Oracle ID
          </th>
          <td class="oracles-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/oracles/${oracle.id}`"
              :hash="oracle.id"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <hint-tooltip>
              {{ oraclesHints.registered }}
            </hint-tooltip>
            <time-toggle-button class="oracles-table-condensed__button">
              Registered
            </time-toggle-button>
          </th>
          <td class="oracles-table-condensed__data">
            <block-time-cell
              :height="oracle.registeredHeight"
              :timestamp="oracle.registered"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <hint-tooltip>
              {{ oraclesHints.expiration }}
            </hint-tooltip>
            <time-toggle-button class="oracles-table-condensed__button">
              Expiration
            </time-toggle-button>
          </th>
          <td class="oracles-table-condensed__data">
            <block-time-cell
              :height="oracle.expirationHeight"
              :timestamp="oracle.expiration"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <hint-tooltip>
              {{ oraclesHints.queryFee }}
            </hint-tooltip>
            Query Fee
          </th>
          <td class="oracles-table-condensed__data">
            <price-label :price="oracle.queryFee"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'

defineProps({
  oracles: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.oracles-table-condensed {
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

  &__button {
    margin-left: 3px;
  }
}
</style>
