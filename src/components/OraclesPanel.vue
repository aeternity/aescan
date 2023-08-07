<template>
  <app-panel>
    <paginated-content
      :entities="oracles"
      :limit="limit"
      @prev-clicked="loadPrevOracles"
      @next-clicked="loadNextOracles">
      <oracles-table
        class="oracles-panel__oracles-table"
        :oracles="oracles"/>
      <oracles-table-condensed
        class="oracles-panel__oracles-table-condensed"
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

<style scoped>
.oracles-panel {
  &__oracles-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__oracles-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
