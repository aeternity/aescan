<template>
  <app-panel class="state-channels-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="stateChannels"
      pagination-style="history"
      :total-count="stateChannelsCount"
      @prev-clicked="loadPrevStateChannels"
      @next-clicked="loadNextStateChannels">
      <state-channels-table :state-channels="stateChannels"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { stateChannels, stateChannelsCount } = storeToRefs(useStateChannelsStore())
const { fetchStateChannels, fetchStateChannelsCount } = useStateChannelsStore()

const pageIndex = ref(1)

async function loadPrevStateChannels() {
  await fetchStateChannels({
    queryParameters: stateChannels.value.prev.substring(3),
  })
}

async function loadNextStateChannels() {
  await fetchStateChannels({
    queryParameters: stateChannels.value.next.substring(3),
  })
}

async function loadStateChannels() {
  await fetchStateChannels()
  pageIndex.value = 1
}

await fetchStateChannelsCount()

if (process.client) {
  loadStateChannels()
}
</script>
