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

const tokenDetailsStore = useTokenDetailsStore()
const { fetchTokenHolders, fetchTokenHoldersCount } = tokenDetailsStore
const { tokenHolders, tokenDetails, tokenHoldersCount } = storeToRefs(tokenDetailsStore)

function loadPrevHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.prev })
}

function loadNextHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)

  fetchTokenHolders({ limit: limit.value })
  fetchTokenHoldersCount()
}
</script>
