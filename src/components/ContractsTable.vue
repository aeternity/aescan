<template>
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
        <th>Verified</th>
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
          <block-time-cell
            :height="contract.createdHeight"
            :datetime="contract.created"/>
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
        <td>
          <verified-icon/>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import HintTooltip from '@/components/HintTooltip'
import VerifiedIcon from '@/components/VerifiedIcon'

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
