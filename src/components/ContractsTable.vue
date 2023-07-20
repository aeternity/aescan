<template>
  <table class="contracts-table__table">
    <thead>
      <tr>
        <th>
          Smart Contract ID
          <hint-tooltip>
            {{ contractsHints.contractId }}
          </hint-tooltip>
        </th>
        <th>
          Created By
          <hint-tooltip>
            {{ contractsHints.createdBy }}
          </hint-tooltip>
        </th>
        <th>
          Create Transaction
          <hint-tooltip>
            {{ contractsHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          Created By
          <hint-tooltip>
            {{ contractsHints.creator }}
          </hint-tooltip>
        </th>
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
          <div>
            {{ contract.createdHeight }}
          </div>
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
<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import HashSymbol from '@/components/HashSymbol'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  contracts: {
    type: Object,
    required: true,
  },
})
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
