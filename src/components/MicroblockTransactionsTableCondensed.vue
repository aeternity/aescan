<template>
  <div class="microblock-transactions-table-condensed">
    <table
      v-for="transaction in transactions.data"
      :key="transaction.hash"
      class="microblock-transactions-table-condensed__table">
      <tbody>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ microblocksHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <app-link
              :to="`/transactions/${transaction.hash}`">
              {{ transaction.hash }}
            </app-link>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Time
              <template #tooltip>
                {{ microblocksHints.time }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <datetime-label :datetime="transaction.time"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { microblocksHints } from '@/utils/hints/microblocksHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.microblock-transactions-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    vertical-align: top;
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
