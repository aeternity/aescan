<template>
  <div class="contracts-table-condensed">
    <table
      v-for="contract in contracts.data"
      :key="contract.contractId"
      class="contracts-table-condensed__table">
      <tbody>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            Smart Contract ID
          </th>
          <td class="contracts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/contracts/${contract.contractId}`"
              :hash="contract.contractId"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            Created
          </th>
          <td class="contracts-table-condensed__data">
            <div>
              {{ contract.createdHeight }}
            </div>
            <datetime-label :datetime="contract.created"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            Hash
          </th>
          <td class="contracts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/transactions/${contract.hash}`"
              :hash="contract.hash"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            Created by
          </th>
          <td class="contracts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/accounts/${contract.createdBy}`"
              :hash="contract.createdBy"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'ContractTableCondensed',
  components: {
    ValueHashEllipsed,
    DatetimeLabel,
  },
  props: {
    contracts: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.contracts-table-condensed {
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
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
