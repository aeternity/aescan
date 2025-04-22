<template>
  <app-panel class="state-channels-panel">
    <paginated-content
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

async function loadPrevStateChannels() {
  await fetchStateChannels(stateChannels.value.prev)
}

async function loadNextStateChannels() {
  await fetchStateChannels(stateChannels.value.next)
}

async function loadStateChannels() {
  await fetchStateChannels()
}

await fetchStateChannelsCount()

if (process.client) {
  loadStateChannels()
}
</script>
