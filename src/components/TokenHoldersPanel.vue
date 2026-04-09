<template>
  <app-panel class="token-holders-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('token-holders')

watch(pageLimit, () => {
  fetchTokenHolders({ limit: pageLimit.value })
})

function loadPrevHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.prev.substring(3) })
}

function loadNextHolders() {
  fetchTokenHolders({ queryParameters: tokenHolders.value.next.substring(3) })
}

if (import.meta.client) {
  fetchTokenHolders({ limit: pageLimit.value })
  fetchTokenHoldersCount()
}
</script>
