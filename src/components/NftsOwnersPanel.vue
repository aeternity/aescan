<template>
  <app-panel>
    <paginated-content
      :entities="nftOwners"
      :limit="limit"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nfts-owners-table
        :owners="nftOwners"
        class="nfts-owners-panel__table u-hidden-mobile"/>
      <nfts-owners-table-condensed
        :owners="nftOwners"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import { isDesktop } from '@/utils/screen'

const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)
const { fetchNftOwners } = nftDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadNextNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.next })
}

async function loadPrevNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.prev })
}
</script>

<style scoped>
.nfts-owners-panel__table {
  margin-bottom: var(--space-4);
}
</style>
