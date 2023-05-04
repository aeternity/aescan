<template>
  <app-panel>
    {{ stateChannels }}
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStateChannelsStore } from '~/stores/stateChannels2'

const stateChannelsStore = useStateChannelsStore()
const { stateChannels } = storeToRefs(stateChannelsStore)
const { fetchStateChannels } = stateChannelsStore

const loadStateChannels = () => {
  fetchStateChannels()
}

if (process.client) {
  loadStateChannels()
}
// todo solve naming
</script>
