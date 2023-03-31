<template>
  <app-panel class="account-names-panel">
    <paginated-content
      :entities="accountNames"
      pagination-style="history"
      @prev-clicked="loadPrevAccountNames"
      @next-clicked="loadNextAccountNames">
      <account-names-table
        class="account-names-panel__account-names-table"
        :account-names="accountNames"/>

      <account-names-table-condensed
        class="account-names-panel__account-names-table-condensed"
        :account-names="accountNames"/>
    </paginated-content>
  </app-panel>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import AccountNamesTable from '@/components/AccountNamesTable'
import AccountNamesTableCondensed from '@/components/AccountNamesTableCondensed'
import { useAccountStore } from '@/stores/accountDetails'

export default {
  name: 'AccountNamesPanel',
  components: {
    AppPanel,
    PaginatedContent,
    AccountNamesTable,
    AccountNamesTableCondensed,
  },
  computed: {
    ...mapState(useAccountStore, ['accountNames']),
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchAccountNames']),
    loadPrevAccountNames() {
      this.fetchAccountNames({ queryParameters: this.accountNames.prev })
    },
    loadNextAccountNames() {
      this.fetchAccountNames({ queryParameters: this.accountNames.next })
    },
  },
}
</script>

<style scoped>
.account-names-panel {
  background: var(--color-white);
  padding: var(--space-4) var(--space-1) var(--space-3);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__account-names-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-3);
    }
  }

  &__account-names-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
