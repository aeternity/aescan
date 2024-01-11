<template>
  <div>
    <table
      v-for="contract in contracts.data"
      :key="contract.contractId"
      class="contracts-table-condensed__table">
      <tbody>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              Smart Contract ID
              <template #tooltip>
                {{ contractsHints.contractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <div class="contracts-table-condensed__container">
              <value-hash-ellipsed
                :link-to="`/contracts/${contract.contractId}`"
                :hash="contract.contractId"/>
              <verified-icon v-if="contract.isVerified"/>
            </div>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              <time-toggle-button>Created</time-toggle-button>
              <template #tooltip>
                {{ contractsHints.created }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <block-time-cell
              :height="contract.createdHeight"
              :timestamp="contract.created"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              Create Transaction
              <template #tooltip>
                {{ contractsHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/transactions/${contract.hash}`"
              :hash="contract.hash"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              Created By
              <template #tooltip>
                {{ contractsHints.creator }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/accounts/${contract.createdBy}`"
              :hash="contract.createdBy"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              Verified
              <template #tooltip>
                <!--                todo hint-->
                {{ contractsHints.verified }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <app-icon
              size="24"
              class="contracts-table-condensed__icon"
              name="verified"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { contractsHints } from '@/utils/hints/contractsHints'
import VerifiedIcon from '@/components/VerifiedIcon'

defineProps({
  contracts: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.contracts-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-0);
  }
}
</style>
