<template>
  <app-panel class="keyblock-microblock-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      pagination-style="history"
      :entities="keyblockMicroblocks"
      :total-count="microblocksCount"
      :limit="limit"
      @prev-clicked="loadPrevMicroblocks"
      @next-clicked="loadNextMicroblocks">
      <keyblock-microblocks-table
        v-if="keyblockMicroblocks"
        :microblocks="keyblockMicroblocks"
        class="keyblock-microblock-panel__table"/>
      <keyblock-microblocks-table-condensed
        v-if="keyblockMicroblocks"
        :microblocks="keyblockMicroblocks"
        class="keyblock-microblock-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetailsStore'
import KeyblockMicroblocksTable from '@/pages/keyblocks/KeyblockMicroblocksTable'
import PaginatedContent from '@/components/PaginatedContent'
import KeyblockMicroblocksTableCondensed from '~/pages/keyblocks/KeyblockMicroblocksTableCondensed'

defineProps({
  microblocksCount: {
    type: Object,
    required: true,
  },
})

const { keyblockMicroblocks } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblockMicroblocks } = useKeyblockDetailsStore()
const route = useRoute()

const limit = computed(() => isDesktop() ? 10 : 3)
await fetchKeyblockMicroblocks({
  limit: limit.value,
  keyblockHash: route.params.id,
})

const pageIndex = ref(1)
const loadPrevMicroblocks = () => fetchKeyblockMicroblocks({ queryParameters: keyblockMicroblocks.value.prev })
const loadNextMicroblocks = () => fetchKeyblockMicroblocks({ queryParameters: keyblockMicroblocks.value.next })
// todo shorten naming
</script>

<style scoped>
.keyblock-microblock-panel {
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);
  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
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
