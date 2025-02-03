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
      <state-channels-table :state-channels="stateChannels"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { stateChannels, stateChannelsCount } = storeToRefs(useStateChannelsStore())
const { fetchStateChannels, fetchStateChannelsCount } = useStateChannelsStore()

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
