<template>
  <paginated-content
    :entities="transactions"
    @prev-clicked="loadPrevTransactions"
    @next-clicked="loadNextTransactions">
    <table>
      <thead>
        <tr>
          <th>Hash</th>
          <th>Age</th>
          <th>Type</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions.data"
          :key="transaction.hash ">
          <td>
            <hash-symbol>
              th
            </hash-symbol>

            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>
          </td>
          <td>
            <datetime-label :datetime="transaction.created"/>
          </td>
          <td>{{ transaction.type }}</td>
          <td>
            <transaction-cell
              :transaction-data="transaction.data"
              :transaction-type="transaction.type"/>
          </td>
        </tr>
      </tbody>
    </table>
  </paginated-content>
</template>
<script>
import { mapActions } from 'pinia'
import HashSymbol from '@/components/HashSymbol'
import PaginatedContent from '@/components/PaginatedContent'
import DatetimeLabel from '@/components/DatetimeLabel'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'MicroblockTransactionsTable',
  components: { ValueHashEllipsed, TransactionCell, PaginatedContent, HashSymbol, DatetimeLabel },
  props: {
    transactions: {
      required: true,
      type: Object,
    },
  },
  computed: {
    hasPagination() {
      return this.transactions && (this.transactions.prev || this.transactions.next)
    },
    isPrevDisabled() {
      return !this.transactions.prev
    },
    isNextDisabled() {
      return !this.transactions.next
    },
  },
  methods: {
    ...mapActions(useRecentBlocksStore, ['fetchSelectedMicroblockTransactions']),
    loadPrevTransactions() {
      this.fetchSelectedMicroblockTransactions(this.transactions.prev)
    },
    loadNextTransactions() {
      this.fetchSelectedMicroblockTransactions(this.transactions.next)
    },
  },
}
</script>

<style scoped>
.microblock-transaction-table {
  &__pagination {
    margin-top: var(--space-0);
  }
}
</style>
