<template>
  <!--  todo class fix-->
  <table class="contracts-table">
    <thead>
      <tr>
        <th>
          Smart Contract ID
          <hint-tooltip>
            {{ contractsHints.contractId }}
          </hint-tooltip>
        </th>
        <th>
          Created
          <hint-tooltip>
            {{ contractsHints.created }}
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
            <app-link
              :to="`/keyblocks/${contract.createdHeight}`">
              {{ contract.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="contract.created"/>
        </td>
        <td class="contracts-table__data">
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
  margin-bottom: var(--space-4);

  &__data {
    vertical-align: top;
  }
}
</style>
