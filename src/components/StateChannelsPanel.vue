<template>
  <app-panel class="state-channels-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="stateChannels"
      pagination-style="history"
      :total-count="stateChannelsCount"
      :limit="limit"
      @prev-clicked="loadPrevStateChannels"
      @next-clicked="loadNextStateChannels">
      <state-channels-table
        :state-channels="stateChannels"
        class="state-channels-panel__table"/>
      <state-channels-table-condensed
        :state-channels="stateChannels"
        class="state-channels-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useStateChannelsStore } from '@/stores/stateChannels'
import PaginatedContent from '@/components/PaginatedContent'
import StateChannelsTableCondensed from '@/components/StateChannelsTableCondensed'
import { isDesktop } from '@/utils/screen'

const stateChannelsStore = useStateChannelsStore()
const { stateChannels, stateChannelsCount } = storeToRefs(stateChannelsStore)
const { fetchStateChannels, fetchStateChannelsCount } = stateChannelsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

async function loadPrevStateChannels() {
  await fetchStateChannels({
    queryParameters: stateChannels.value.prev,
  })
}

async function loadNextStateChannels() {
  await fetchStateChannels({
    queryParameters: stateChannels.value.next,
  })
}

async function loadStateChannels() {
  await fetchStateChannels({ limit: limit.value })
  pageIndex.value = 1
}

await fetchStateChannelsCount()

if (process.client) {
  loadStateChannels()
}
</script>

<style scoped>
.state-channels-panel {
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
