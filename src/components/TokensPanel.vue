<template>
  <app-panel class="tokens-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="selectedTokens"
      :total-count="selectedTokensCount"
      :limit="limit"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <template #header>
        <token-select
          v-if="hasTokenSelect"
          v-model="selectedTokenName"/>
      </template>
      <tokens-table
        v-if="selectedTokens"
        class="u-hidden-mobile"
        :tokens="selectedTokens"/>
      <tokens-table-condensed
        v-if="selectedTokens"
        class="u-hidden-desktop"
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

async function loadPrevTokens() {
  await fetchTokens(selectedTokens.value.prev)
}

async function loadNextTokens() {
  await fetchTokens(selectedTokens.value.next)
}

const hasTokenSelect = computed(() => {
  return featureFlags.dex && NETWORK_NAME !== 'TESTNET'
})

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

await useAsyncData(async() => {
  await fetchTokensCount()
  return true
})

if (process.client) {
  watch(selectedTokenName, async() => {
    pageIndex.value = 1
    await fetchTokens(`/v3/aex9?by=name&direction=forward&limit=${limit.value}`)
  }, {
    immediate: true,
  })
}

</script>
