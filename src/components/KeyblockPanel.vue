<template>
  <app-panel>
    <paginated-content :entities="keyblocks">
      <keyblocks-table
        v-if="keyblocks"
        class="u-hidden-mobile"
        :keyblocks="keyblocks"/>

    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useKeyblockStore } from "@/stores/keyblocks";

const keyblockStore = useKeyblockStore()
const { fetchKeyblocks } = keyblockStore
const { keyblocks } = storeToRefs(keyblockStore)

await useAsyncData(async () => {
  await fetchKeyblocks()
  return true
})
</script>
