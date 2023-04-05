<template>
  <app-panel class="tokens-panel">
    <header class="tokens-panel__header">
      <token-select v-model="selectedTokensName"/>
    </header>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="selectedTokens"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <tokens-table
        v-if="selectedTokens"
        class="tokens-panel__table"
        :tokens="selectedTokens"/>
      <tokens-table-condensed
        v-if="selectedTokens"
        class="tokens-panel__table-condensed"
        :tokens="selectedTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useTokensStore } from '~/stores/tokens'
import TokensTableCondensed from '~/components/TokensTableCondensed.vue'
import TokensTable from '~/components/TokensTable.vue'
import TokenSelect from '~/components/TokenSelect.vue'
import PaginatedContent from '~/components/PaginatedContent.vue'
import { isDesktop } from '@/utils/screen'

const tokensStore = useTokensStore()
const {
  listedTokens,
  allTokens,
} = storeToRefs(tokensStore)
const { fetchAllTokens, fetchListedTokens } = useTokensStore()

const selectedTokensName = ref({ label: 'Listed', key: 'listedTokens' })
const selectedTokens = ref(null)
const limit = computed(() => process.client && isDesktop() ? 10 : 3) // todo unify
const pageIndex = ref(1)

async function loadPrevTokens() {
  await fetchAllTokens(selectedTokens.value.prev)
  selectedTokens.value = allTokens.value
}

async function loadNextTokens() {
  await fetchAllTokens(selectedTokens.value.next)
  selectedTokens.value = allTokens.value
}

watch(selectedTokensName, () => {
  loadTokens(selectedTokensName.value?.key)
})

onMounted(() => {
  loadTokens(selectedTokensName.value?.key)
})

async function loadTokens(selectedTokensName) {
  // todo move to store
  if (selectedTokensName === 'listedTokens') {
    await fetchListedTokens()
    selectedTokens.value = listedTokens.value
  } else {
    await fetchAllTokens(`/v2/aex9?limit=${limit.value}`)
    selectedTokens.value = allTokens.value
  }
}

</script>

<style scoped>
.tokens-panel {
  padding: var(--space-4) var(--space-1);

  &__header {
    display: flex;
    justify-content: flex-end;
  }

  @media (--desktop) {
    padding: var(--space-4);
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
