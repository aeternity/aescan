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
          <time-toggle-button>Created</time-toggle-button>
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
          <div class="contracts-table__container">
            <value-hash-ellipsed
              :link-to="`/contracts/${contract.contractId}`"
              :hash="contract.contractId"/>
            <verified-icon v-if="contract.isVerified"/>
          </div>
        </td>
        <td class="contracts-table__data">
          <block-time-cell
            :height="contract.createdHeight"
            :timestamp="contract.created"/>
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

  &__container {
    display: flex;
    align-items: center;
    gap: var(--space-0);
  }
}
</style>
