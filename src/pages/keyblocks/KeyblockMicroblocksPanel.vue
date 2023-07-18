<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      pagination-style="history"
      :entities="keyblockMicroblocks"

      @prev-clicked="loadPrevMicroblocks"
      @next-clicked="loadNextMicroblocks">
      <keyblock-microblocks-table
        v-if="keyblockMicroblocks"
        :microblocks="keyblockMicroblocks"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetailsStore'
import KeyblockMicroblocksTable from '@/pages/keyblocks/KeyblockMicroblocksTable'
import PaginatedContent from '@/components/PaginatedContent'

const { keyblockMicroblocks } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblockMicroblocks } = useKeyblockDetailsStore()
const route = useRoute()

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchKeyblockMicroblocks({
    limit: limit.value,
    keyblockHash: route.params.id,
  })
}

const pageIndex = ref(1)
const loadPrevMicroblocks = () => fetchKeyblockMicroblocks({ queryParameters: keyblockMicroblocks.value.prev })
const loadNextMicroblocks = () => fetchKeyblockMicroblocks({ queryParameters: keyblockMicroblocks.value.next })
// todo shorten naming
</script>
