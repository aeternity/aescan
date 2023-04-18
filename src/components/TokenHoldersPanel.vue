<template>
  <app-panel class="token-holders-panel">
    <paginated-content
      :entities="tokenHolders"
      @prev-clicked="loadPrevHolders"
      @next-clicked="loadNextHolders">
      <token-holders-table
        v-if="tokenHolders"
        :token-holders="tokenHolders"
        :token-details="tokenDetails"
        class="token-holders-panel__table"/>

      <token-holders-table-condensed
        v-if="tokenHolders"
        :token-holders="tokenHolders"
        :token-details="tokenDetails"
        class="token-holders-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useTokenDetailsStore } from '@/stores/tokenDetails'
import TokenHoldersTable from '@/components/TokenHoldersTable'
import TokenHoldersTableCondensed from '@/components/TokenHoldersTableCondensed'
import PaginatedContent from '@/components/PaginatedContent'

const tokenDetailsStore = useTokenDetailsStore()
const { fetchTokenHolders } = tokenDetailsStore
const { tokenHolders, tokenDetails } = storeToRefs(tokenDetailsStore)

function loadPrevHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.prev })
}

function loadNextHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  fetchTokenHolders({
    limit: limit.value,
  })
}
</script>

<style scoped>
.token-holders-panel {
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
