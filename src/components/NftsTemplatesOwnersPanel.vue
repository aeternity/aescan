<template>
  <app-panel class="nfts-templates-owners-panel">
    <paginated-content
      :entities="nftOwners"
      :limit="limit"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nfts-templates-owners-table
        :owners="nftOwners"
        class="nfts-templates-owners-panel__table"/>
      <nfts-templates-owners-table-condensed
        :owners="nftOwners"
        class="nfts-templates-owners-panel__table-condensed"/>
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
.nfts-templates-owners-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  /*todo fix style*/
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
