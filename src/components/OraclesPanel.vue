<template>
  <app-panel>
    <paginated-content
      :entities="oracles"
      :limit="limit"
      @prev-clicked="loadPrevOracles"
      @next-clicked="loadNextOracles">
      <oracles-table
        class="u-hidden-mobile"
        :oracles="oracles"/>
      <oracles-table-condensed
        class="u-hidden-desktop"
        :oracles="oracles"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useOraclesStore } from '@/stores/oracles'
import OraclesTableCondensed from '@/components/OraclesTableCondensed'
import OraclesTable from '@/components/OraclesTable'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const oraclesStore = useOraclesStore()
const { fetchOracles } = oraclesStore
const { oracles } = storeToRefs(oraclesStore)

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

function loadPrevOracles() {
  fetchOracles({ queryParameters: oracles.value.prev })
}

function loadNextOracles() {
  fetchOracles({ queryParameters: oracles.value.next })
}

if (process.client) {
  fetchOracles({
    limit: limit.value,
  })
}

</script>
