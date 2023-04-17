<template>
  <table class="contracts-table__table">
    <thead>
      <tr>
        <th>Smart Contract ID</th>
        <th>Created</th>
        <th>Hash</th>
        <th>Created By</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="contract in contracts.data"
        :key="contract.contractId">
        <td class="contracts-table__data">
          <value-hash-ellipsed
            :link-to="`/contracts/${contract.contractId}`"
            :hash="contract.contractId"/>
        </td>
        <td class="contracts-table__data">
          <datetime-label :datetime="contract.created"/>
        </td>
        <td class="contracts-table__data">
          <hash-symbol>th</hash-symbol>
          <value-hash-ellipsed
            :link-to="`/transactions/${contract.hash}`"
            :hash="contract.hash"/>
        </td>
        <td class="contracts-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${contract.createdBy}`"
            :hash="contract.createdBy"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import HashSymbol from '@/components/HashSymbol'
import { formatBlocksRelative } from '@/utils/format'

export default {
  name: 'ContractsTable',
  components: { HashSymbol, DatetimeLabel, ValueHashEllipsed },
  props: {
    contracts: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatBlocksRelative,
  },
}
</script>

<style scoped>
.contracts-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__data {
    vertical-align: top;
  }
}
</style>
