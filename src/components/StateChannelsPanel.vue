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
        class="u-hidden-mobile"/>
      <state-channels-table-condensed
        :state-channels="stateChannels"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

import { computed, ref } from 'vue'
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
