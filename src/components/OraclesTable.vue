<template>
  <table class="oracles-table__table">
    <thead>
      <tr>
        <th>Oracle ID</th>
        <th>Registered At</th>
        <th>Expiration</th>
        <th>Query Fee</th>
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
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { formatAePrice } from '@/utils/format'

defineProps({
  oracles: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.oracles-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__data {
    vertical-align: top;
  }
}
</style>
