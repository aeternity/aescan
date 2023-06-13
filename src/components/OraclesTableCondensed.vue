<template>
  <div class="oracles-table-condensed">
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
                {{ oraclesHints.oracleRegistered }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            <div>
              {{ oracle.activeFromHeight }}
            </div>
            <datetime-label :datetime="oracle.activeFrom"/>
          </td>
        </tr>
        <tr class="oracles-table-condensed__row">
          <th class="oracles-table-condensed__header">
            <app-tooltip>
              Expiration
              <template #tooltip>
                {{ oraclesHints.oracleExpiration }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracles-table-condensed__data">
            <div>
              {{ oracle.expireHeight }}
            </div>
            <datetime-label :datetime="oracle.expire"/>
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
import DatetimeLabel from '@/components/DatetimeLabel'
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
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
