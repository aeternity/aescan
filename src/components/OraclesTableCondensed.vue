<template>
  <div>
    <table
      v-for="oracle in oracles.data"
      :key="oracle.oracleId"
      class="oracles-table-condensed__table">
      <tbody>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <app-tooltip>
              Oracle ID
              <template #tooltip>
                {{ oraclesHints.oracleId }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/oracles/${oracle.id}`"
              :hash="oracle.id"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <app-tooltip>
              Registered
              <template #tooltip>
                {{ oraclesHints.registered }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            <block-time-cell
              :height="oracle.activatedHeight"
              :datetime="oracle.activated"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <app-tooltip>
              Expiration
              <template #tooltip>
                {{ oraclesHints.expiration }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            <block-time-cell
              :height="oracle.expirationHeight"
              :datetime="oracle.expiration"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <app-tooltip>
              Query Fee
              <template #tooltip>
                {{ oraclesHints.queryFee }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            {{ formatAePrice(oracle.queryFee) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatAePrice } from '@/utils/format'
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
}
</style>
