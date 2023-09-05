<template>
  <app-panel
    v-if="nftOwners"
    class="nfts-owners-panel">
    <paginated-content
      :entities="nftOwners"
      :limit="limit"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nfts-owners-table
        :owners="nftOwners"
        class="nfts-owners-panel__table"/>
      <nfts-owners-table-condensed
        :owners="nftOwners"
        class="nfts-owners-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

// todo emove props

const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)
const { fetchNftOwners } = nftDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

function loadNextNftowners() {
  fetchNftOwners({ queryParameters: nftOwners.value.next })
}

function loadPrevNftowners() {
  fetchNftOwners({ queryParameters: nftOwners.value.prev })
}
</script>

<style scoped>
.nfts-owners-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

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
