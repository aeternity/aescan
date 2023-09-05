<template>
  <app-panel>
    <paginated-content
      pagination-style="history"
      :entities="nftInventory"
      :limit="limit"
      @next-clicked="loadNextNftInventory"
      @prev-clicked="loadPrevNftInventory">
      <nft-inventory-table
        :nft-inventory="nftInventory"
        class="nft-inventory-panel__table"/>
      <nft-inventory-table-condensed
        :nft-inventory="nftInventory"
        class="nft-inventory-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'
import NftInventoryTable from '@/components/NftInventoryTable'
import NftInventoryTableCondensed from '@/components/NftInventoryTableCondensed'

const route = useRoute()
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

const nftDetailsStore = useNftDetailsStore()
const { nftInventory } = storeToRefs(nftDetailsStore)
const { fetchNftInventory } = nftDetailsStore

await fetchNftInventory({
  limit: limit.value,
  contractId: route.params.id,
})

function loadPrevNftInventory() {
  fetchNftInventory({ queryParameters: nftInventory.value.prev })
}

function loadNextNftInventory() {
  fetchNftInventory({ queryParameters: nftInventory.value.next })
}
</script>

<style scoped>
.nft-inventory-panel {
  &__table {
    display: none;
    margin-bottom: var(--space-4);
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
