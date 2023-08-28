<template>
  <app-panel class="">
    {{ nftTransfers }}
  </app-panel>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useNftDetailsStore } from '@/stores/nftDetails'

const route = useRoute()

const nftDetailsStore = useNftDetailsStore()
const { nftTransfers } = storeToRefs(nftDetailsStore)
const { fetchNftTransfers } = nftDetailsStore

if (process.client) {
  fetchNftTransfers(route.params.id)
}
</script>

<!--<style scoped>-->
<!--. {-->

<!--}-->
<!--</style>-->
