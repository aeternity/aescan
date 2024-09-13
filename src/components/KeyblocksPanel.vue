<template>
  <app-panel>
    <paginated-content
      :entities="keyblocks"
      :total-count="keyblocksCount"
      v-model:page-index="pageIndex"
      @prev-clicked="loadPrevKeyblocks"
      @next-clicked="loadNextKeyblocks">
      <keyblocks-table
        class="u-hidden-mobile"
        :keyblocks="keyblocks"/>
      <keyblocks-table-condensed
        class="u-hidden-desktop"
        :keyblocks="keyblocks"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useKeyblockStore } from "@/stores/keyblocks";
import { computed, ref } from "vue";
import { isDesktop } from "@/utils/screen";

const keyblockStore = useKeyblockStore()
const { fetchKeyblocks } = keyblockStore
const { keyblocks, keyblocksCount } = storeToRefs(keyblockStore)

const limit = computed(() => isDesktop() ? 10 : 3)
const pageIndex = ref(1)

async function loadPrevKeyblocks() {
  await fetchKeyblocks({
    queryParameters: keyblocks.value.prev,
  })
}

async function loadNextKeyblocks() {
  await fetchKeyblocks({
    queryParameters: keyblocks.value.next,
  })
}


if (process.client) {
  fetchKeyblocks({ limit: limit.value })
}


</script>
