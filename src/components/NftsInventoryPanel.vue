<template>
  <app-panel>
    <paginated-content
      pagination-style="history"
      :entities="nftInventory"
      :limit="limit"
      @next-clicked="loadNextNftInventory"
      @prev-clicked="loadPrevNftInventory">
      <nfts-inventory-table
        :nft-inventory="nftInventory"
        class="nfts-inventory-panel__table u-hidden-mobile"/>
      <nfts-inventory-table-condensed
        :nft-inventory="nftInventory"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

const nftDetailsStore = useNftDetailsStore()
const { nftInventory } = storeToRefs(nftDetailsStore)
const { fetchNftInventory } = nftDetailsStore

async function loadPrevNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.prev })
}

async function loadNextNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.next })
}

if (process.client) {
  await fetchNftInventory({ limit: limit.value })
}
</script>

<style scoped>
.nfts-inventory-panel__table {
  margin-bottom: var(--space-4);
}
</style>
