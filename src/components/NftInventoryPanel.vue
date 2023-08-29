<template>
  <app-panel>{{ nftInventory }}</app-panel>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import { isDesktop } from '~/utils/screen'

const route = useRoute()
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

const nftDetailsStore = useNftDetailsStore()
const { nftInventory } = storeToRefs(nftDetailsStore)
const { fetchNftInventory } = nftDetailsStore

await fetchNftInventory({
  limit: limit.value,
  contractId: route.params.id,
})
</script>
