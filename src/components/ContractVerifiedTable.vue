<template>
  <table class="contract-verified-table">
    <tbody>
      <tr class="contract-verified-table__row">
        <th class="contract-verified-table__table-header">
          <hint-tooltip>
            {{ contractVerifiedHints.license }}
          </hint-tooltip>
          License
        </th>
        <td class="contract-verified-table__data">
          {{ verificationDetails.license }}
        </td>
      </tr>

      <tr class="contract-verified-table__row">
        <th class="contract-verified-table__table-header">
          <hint-tooltip>
            {{ contractVerifiedHints.compiler }}
          </hint-tooltip>
          Compiler Version
        </th>
        <td class="contract-verified-table__data">
          {{ verificationDetails.compiler }}
        </td>
      </tr>
      <tr class="contract-verified-table__row">
        <th class="contract-verified-table__table-header">
          <hint-tooltip>
            {{ contractVerifiedHints.entryFile }}
          </hint-tooltip>
          Entry File
        </th>
        <td class="contract-verified-table__data">
          {{ verificationDetails.entryFile }}
        </td>
      </tr>
      <tr class="contract-verified-table__row">
        <th class="contract-verified-table__table-header">
          <hint-tooltip>
            {{ contractVerifiedHints.verifiedAt }}
          </hint-tooltip>
          <time-toggle-button>Verified</time-toggle-button>
        </th>
        <td class="contract-verified-table__data">
          <timestamp-label :timestamp="verificationDetails.verifiedAt"/>
        </td>
      </tr>
      <tr class="contract-verified-table__row">
        <th class="contract-verified-table__table-header">
          <hint-tooltip>
            {{ contractVerifiedHints.initCallParameters }}
          </hint-tooltip>
          Entrypoint
        </th>
        <td class="contract-verified-table__data">
          {{ verificationDetails.initCallParameters }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.contract-verified-table {
  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__data {
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }
}
</style>
