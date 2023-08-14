<template>
  <div class="contracts-table-condensed">
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
            <value-hash-ellipsed
              :link-to="`/contracts/${contract.contractId}`"
              :hash="contract.contractId"/>
          </td>
        </tr>
        <tr class="contracts-table-condensed__row">
          <th class="contracts-table-condensed__header">
            <app-tooltip>
              Created
              <template #tooltip>
                {{ contractsHints.created }}
              </template>
            </app-tooltip>
          </th>
          <td class="contracts-table-condensed__data">
            <div>
              <app-link
                :to="`/keyblocks/${contract.createdHeight}`">
                {{ contract.createdHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="contract.created"/>
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
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { contractsHints } from '@/utils/hints/contractsHints'

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
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    border-bottom: 1.5px solid var(--color-midnight-25);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
