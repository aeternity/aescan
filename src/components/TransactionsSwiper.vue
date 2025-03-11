<template>
  <app-swiper :slides="transactions.data">
    <template #slide="{ slideData: transaction }">
      <table>
        <tbody>
          <tr>
            <th class="transactions-swiper__header">
              <hint-tooltip>
                {{ transactionsHints.hash }}
              </hint-tooltip>
              Hash
            </th>
            <td class="transactions-swiper__data">
              <value-hash-ellipsed
                :hash="transaction.hash"
                :link-to="`/transactions/${transaction.hash }`"/>
            </td>
          </tr>
          <tr>
            <th class="transactions-swiper__header">
              <hint-tooltip>
                {{ transactionsHints.created }}
              </hint-tooltip>
              <time-toggle-button class="transactions-swiper__button">
                Created
              </time-toggle-button>
            </th>
            <td class="transactions-swiper__data">
              <timestamp-label :timestamp="transaction.created"/>
            </td>
          </tr>
          <tr>
            <th class="transactions-swiper__header">
              <hint-tooltip>
                {{ transactionsHints.type }}
              </hint-tooltip>
              Type
            </th>
            <td class="transactions-swiper__data">
              {{ transaction.type }}
            </td>
          </tr>
          <tr>
            <th>
              <hint-tooltip>
                {{ transactionsHints.data }}
              </hint-tooltip>
              Data
            </th>
            <td>
              <transaction-cell
                class="transactions-swiper__transaction-cell"
                :transaction-data="transaction.data"
                :transaction-type="transaction.type"/>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transactions-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: right;
  }

  &__button {
    margin-left: 3px;
  }

  &__transaction-cell {
    flex-wrap: wrap;
  }
}
</style>
