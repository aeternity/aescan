<template>
  <table class="contract-verified-table">
    <tr class="contract-verified-table__row">
      <th class="contract-verified-table__header">
        License
        <hint-tooltip>
          {{ contractVerifiedHints.license }}
        </hint-tooltip>
      </th>
      <td class="contract-verified-table__data">
        {{ verificationDetails.license }}
      </td>
    </tr>
    <tr class="contract-verified-table__row">
      <th class="contract-verified-table__header">
        Compiler Version
        <hint-tooltip>
          {{ contractVerifiedHints.compiler }}
        </hint-tooltip>
      </th>
      <td class="contract-verified-table__data">
        {{ verificationDetails.compiler }}
      </td>
    </tr>
    <tr class="contract-verified-table__row">
      <th class="contract-verified-table__header">
        Entry File
        <hint-tooltip>
          {{ contractVerifiedHints.entryFile }}
        </hint-tooltip>
      </th>
      <td class="contract-verified-table__data">
        {{ verificationDetails.entryFile }}
      </td>
    </tr>
    <tr class="contract-verified-table__row">
      <th class="contract-verified-table__header">
        <time-toggle-button>Verified</time-toggle-button>
        <hint-tooltip>
          {{ contractVerifiedHints.verifiedAt }}
        </hint-tooltip>
      </th>
      <td class="contract-verified-table__data">
        <timestamp-label :timestamp="verificationDetails.verifiedAt"/>
      </td>
    </tr>
    <tr class="contract-verified-table__row">
      <th class="contract-verified-table__header">
        Entrypoint
        <hint-tooltip>
          {{ contractVerifiedHints.initCallParameters }}
        </hint-tooltip>
      </th>
      <td class="contract-verified-table__data">
        {{ verificationDetails.initCallParameters }}
      </td>
    </tr>
  </table>
</template>

<script setup>

import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
})

</script>

<style scoped>
.contract-verified-table {
  padding: 0 var(--space-1) var(--space-7);
  margin-bottom: var(--space-5);

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
