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
          <time-toggle-button>Registered</time-toggle-button>
          <hint-tooltip>
            {{ oraclesHints.registered }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Expiration</time-toggle-button>
          <hint-tooltip>
            {{ oraclesHints.expiration }}
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
          <block-time-cell
            :height="oracle.registeredHeight"
            :timestamp="oracle.registered"/>
        </td>
        <td class="oracles-table__data">
          <block-time-cell
            :height="oracle.expirationHeight"
            :timestamp="oracle.expiration"/>
        </td>
        <td class="oracles-table__data">
          <price-label :price="oracle.queryFee"/>
        </td>
      </tr>
    </tbody>
  </table>
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
.oracles-table {
  margin-bottom: var(--space-4);

  &__data {
    vertical-align: top;
  }
}
</style>
