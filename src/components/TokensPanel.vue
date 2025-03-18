<template>
  <app-panel class="tokens-panel">
    <paginated-content
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

async function loadPrevTokens() {
  await fetchTokens(selectedTokens.value.prev.substring(3))
}

async function loadNextTokens() {
  await fetchTokens(selectedTokens.value.next.substring(3))
}

const hasTokenSelect = computed(() => {
  return featureFlags.dex && NETWORK_NAME !== 'TESTNET'
})

await useAsyncData(async() => {
  await fetchTokensCount()
  return true
})

if (process.client) {
  watch(selectedTokenName, async() => {
    await fetchTokens('/aex9?by=name&direction=forward&limit=10')
  }, {
    immediate: true,
  })
}

</script>
