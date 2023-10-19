<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="nfts"
      :total-count="nftsCount"
      :limit="limit"
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
import { useNftsStore } from '@/stores/nfts'
import { isDesktop } from '@/utils/screen'

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const nftsStore = useNftsStore()
const {
  nfts,
  nftsCount,
} = storeToRefs(nftsStore)
const { fetchNfts, fetchNftsList } = nftsStore

async function loadPrevNfts() {
  await fetchNftsList({ queryParameters: nfts.value.prev })
}

async function loadNextNfts() {
  await fetchNftsList({ queryParameters: nfts.value.next })
}

if (process.client) {
  await fetchNfts({ queryParameters: `/v2/aex141?limit=${limit.value}&direction=backward&by=creation` })
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
