<template>
  <app-panel class="token-holders-panel">
    <paginated-content
      :entities="tokenHolders"
      :total-count="tokenHoldersCount"
      @prev-clicked="loadPrevHolders"
      @next-clicked="loadNextHolders">
      <token-holders-table
        v-if="tokenHolders"
        :token-holders="tokenHolders"
        :token-details="tokenDetails"
        class="u-hidden-mobile"/>

      <token-holders-table-condensed
        v-if="tokenHolders"
        :token-holders="tokenHolders"
        :token-details="tokenDetails"
        class="u-hidden-desktop"/>
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
const { fetchTokenHolders, fetchTokenHoldersCount } = tokenDetailsStore
const { tokenHolders, tokenDetails, tokenHoldersCount } = storeToRefs(tokenDetailsStore)

function loadPrevHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.prev })
  fetchTokenHoldersCount()
}

function loadNextHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.next })
  fetchTokenHoldersCount()
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  fetchTokenHoldersCount()

  fetchTokenHolders({
    limit: limit.value,
  })
}
</script>
