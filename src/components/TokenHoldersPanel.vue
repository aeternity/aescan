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
        :token-details="tokenDetails"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchTokenHolders, fetchTokenHoldersCount } = useTokenDetailsStore()
const { tokenHolders, tokenDetails, tokenHoldersCount } = storeToRefs(useTokenDetailsStore())

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
