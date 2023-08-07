<template>
  <app-panel>
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
  margin-top: var(--space-2);
  /*todo move*/

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
