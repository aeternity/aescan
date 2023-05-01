<template>
  <app-panel class="tokens-panel">
    <paginated-content
      :entities="selectedTokens"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <template #header>
        <token-select v-model="selectedTokenName"/>
      </template>
      <tokens-table
        v-if="selectedTokens"
        class="tokens-panel__tokens-table"
        :tokens="selectedTokens"/>
      <tokens-table-condensed
        v-if="selectedTokens"
        class="tokens-panel__tokens-table-condensed"
        :tokens="selectedTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTokensStore } from '@/stores/tokens'
import TokensTableCondensed from '@/components/TokensTableCondensed'
import TokensTable from '@/components/TokensTable'
import TokenSelect from '@/components/TokenSelect'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const tokensStore = useTokensStore()
const { selectedTokens, selectedTokenName } = storeToRefs(tokensStore)
const { fetchTokens } = useTokensStore()

async function loadPrevTokens() {
  await fetchTokens(selectedTokens.value.prev)
}

async function loadNextTokens() {
  await fetchTokens(selectedTokens.value.next)
}

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

if (process.client) {
  fetchTokens(`/v2/aex9?by=name&direction=forward&limit=${limit.value}`)
}

</script>

<style scoped>
.tokens-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__tokens-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__tokens-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
