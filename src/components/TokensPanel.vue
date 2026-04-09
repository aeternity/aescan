<template>
  <app-panel class="tokens-panel">
    <paginated-content
      v-model:limit="pageLimit"
      v-model:page-index="pageIndex"
      :entities="selectedTokens"
      :total-count="selectedTokensCount"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <template #header>
        <token-select
          v-if="hasTokenSelect"
          v-model="selectedTokenName"/>
      </template>
      <tokens-table
        v-if="selectedTokens"
        :tokens="selectedTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { NETWORK_NAME } = useRuntimeConfig().public

const { selectedTokens, selectedTokenName, selectedTokensCount } = storeToRefs(useTokensStore())
const { fetchTokens, fetchTokensCount } = useTokensStore()

const featureFlags = useFeatureFlags()

const pageIndex = ref(1)
const pageLimit = usePageLimit('tokens')

async function loadPrevTokens() {
  await fetchTokens({ queryParameters: selectedTokens.value.prev.substring(3) })
}

async function loadNextTokens() {
  await fetchTokens({ queryParameters: selectedTokens.value.next.substring(3) })
}

const hasTokenSelect = computed(() => {
  return featureFlags.dex && NETWORK_NAME !== 'TESTNET'
})

useAsyncData(async () => {
  await fetchTokensCount()
  return true
})

if (import.meta.client) {
  watch(selectedTokenName, async () => {
    pageIndex.value = 1
    await fetchTokens({ queryParameters: `/aex9?by=creation&direction=backward&limit=${pageLimit.value}` })
  }, {
    immediate: true,
  })
  watch(pageLimit, async () => {
    pageIndex.value = 1
    await fetchTokens({ queryParameters: `/aex9?by=creation&direction=backward&limit=${pageLimit.value}` })
  })
}
</script>
