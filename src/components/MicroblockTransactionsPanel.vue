<template>
  <app-panel>
    {{ rawMicroblockTransactions }}
    <table/>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'

const microblockDetailsStore = useMicroblockDetailsStore()
const { rawMicroblockTransactions } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const route = useRoute()

if (process.client) {
  await fetchMicroblockTransactions(route.params.id)
  // await fetchMicroblockTransactions({
  //   limit: limit.value,
  //   contractId: route.params.id,
  // })
}
</script>
