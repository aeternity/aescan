<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="nfts"
      :total-count="nftsCount"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <nfts-table
        :nfts="nfts"
        class="nfts-panel__table"/>
      <nfts-table-condensed
        :nfts="nfts"
        class="nfts-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useNftsStore } from '@/stores/nfts'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'
import NftsTable from '@/components/NftsTable'
import NftsTableCondensed from '@/components/NftsTableCondensed'

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const nftsStore = useNftsStore()
const {
  nfts,
  nftsCount,
} = storeToRefs(nftsStore)
const { fetchNfts, fetchNftsCount } = nftsStore

await fetchNftsCount()
await fetchNfts()

async function loadPrevNfts() {
  await fetchNfts(nfts.value.prev)
}

async function loadNextNfts() {
  await fetchNfts(nfts.value.next)
}

</script>

<style scoped>
.nfts-panel {
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
