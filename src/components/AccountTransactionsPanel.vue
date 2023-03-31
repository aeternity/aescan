<template>
  <app-panel class="account-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="accountTransactions"
      :total-count="accountTransactionsCount"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>

      <account-transactions-table
        class="account-transactions-panel__account-transactions-table"
        :account-transactions="accountTransactions"/>

      <account-transactions-table-condensed
        class="account-transactions-panel__account-transactions-table-condensed"
        :account-transactions="accountTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useAccountStore } from '@/stores/accountDetails'
import AccountTransactionsTable from '@/components/AccountTransactionsTable'
import AccountTransactionsTableCondensed from '@/components/AccountTransactionsTableCondensed'
import TransactionsSelect from '@/components/TransactionsSelect'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

export default {
  name: 'AccountTransactionsPanel',
  components: {
    PaginatedContent,
    TransactionsSelect,
    AccountTransactionsTable,
    AccountTransactionsTableCondensed,
    AppPanel,
  },
  data: () => ({
    selectedTxType: { typeQuery: null, label: 'All types' },
    limit: isDesktop() ? 10 : 3,
    pageIndex: 1,
  }),
  computed: {
    ...mapState(useAccountStore, ['accountTransactions', 'accountTransactionsCount']),
  },
  watch: {
    selectedTxType() {
      this.fetchAccountTransactions({
        accountId: this.$route.params.id,
        limit: this.limit,
        type: this.selectedTxType.typeQuery,
      })
      this.fetchAccountTransactionsCount(this.$route.params.id, this.selectedTxType.typeQuery)
      this.pageIndex = 1
    },
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchAccountTransactions', 'fetchAccountTransactionsCount']),
    loadPrevTransactions() {
      this.fetchAccountTransactions({
        queryParameters: this.accountTransactions.prev,
      })
    },
    loadNextTransactions() {
      this.fetchAccountTransactions({
        queryParameters: this.accountTransactions.next,
      })
    },
  },
}
</script>

<style scoped>
.account-transactions-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__account-transactions-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__account-transactions-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
