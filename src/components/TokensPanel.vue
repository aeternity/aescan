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
          v-if="NETWORK_NAME !== 'TESTNET'"
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
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useTokensStore } from '@/stores/tokens'
import TokensTableCondensed from '@/components/TokensTableCondensed'
import TokensTable from '@/components/TokensTable'
import TokenSelect from '@/components/TokenSelect'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const tokensStore = useTokensStore()
const { selectedTokens, selectedTokenName, selectedTokensCount } = storeToRefs(tokensStore)
const { fetchTokens, fetchTokensCount } = useTokensStore()

const { NETWORK_NAME } = useRuntimeConfig().public

const pageIndex = ref(1)

async function loadPrevTokens() {
  await fetchTokens(selectedTokens.value.prev)
}

async function loadNextTokens() {
  await fetchTokens(selectedTokens.value.next)
}

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

await useAsyncData(async() => {
  await fetchTokensCount()
  return true
})

if (process.client) {
  watch(selectedTokenName, async() => {
    pageIndex.value = 1
    await fetchTokens(`/v2/aex9?by=name&direction=forward&limit=${limit.value}`)
  }, {
    immediate: true,
  })
}

</script>
