<template>
  <table class="oracles-table">
    <thead>
      <tr>
        <th>
          Oracle ID
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
        </th>
        <th>
          Registered
          <hint-tooltip>
            {{ oraclesHints.oracleRegistered }}
          </hint-tooltip>
        </th>
        <th>
          Expiration
          <hint-tooltip>
            {{ oraclesHints.oracleExpiration }}
          </hint-tooltip>
        </th>
        <th>
          Query Fee
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="oracle in oracles.data"
        :key="oracle.oracle">
        <td class="oracles-table__data">
          <value-hash-ellipsed
            :link-to="`/oracles/${oracle.id}`"
            :hash="oracle.id"/>
        </td>
        <td class="oracles-table__data">
          <div>
            {{ oracle.activeFromHeight }}
          </div>
          <datetime-label :datetime="oracle.activeFrom"/>
        </td>
        <td class="oracles-table__data">
          <div>
            {{ oracle.expireHeight }}
          </div>
          <datetime-label :datetime="oracle.expire"/>
        </td>
        <td class="oracles-table__data">
          {{ formatAePrice(oracle.queryFee) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { oraclesHints } from '../utils/hints/oraclesHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { formatAePrice } from '@/utils/format'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  oracles: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.oracles-table {
  margin-bottom: var(--space-2);

  &__data {
    vertical-align: top;
  }
}
</style>
