<template>
  <app-panel class="oracles-panel">
    <paginated-content
      v-if="oracles"
      :entities="oracles"
      :total-count="oraclesCount"
      :limit="limit"
      @prev-clicked="loadPrevOracles"
      @next-clicked="loadNextOracles">
      <oracles-table
        v-if="oracles"
        class="oracles-panel__oracles-table"
        :oracles="oracles"/>
      <oracles-table-condensed
        v-if="oracles"
        class="oracles-panel__oracles-table-condensed"
        :oracles="oracles"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useOraclesStore } from '@/stores/oracles'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import OraclesTableCondensed from '@/components/OraclesTableCondensed'
import OraclesTable from '@/components/OraclesTable'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const oraclesStore = useOraclesStore()
const { fetchOracles } = oraclesStore
const { oracles } = storeToRefs(oraclesStore)

const blockchainStatsStore = useBlockchainStatsStore()
const { fetchBlockchainStats } = blockchainStatsStore
const { oraclesCount } = storeToRefs(blockchainStatsStore)

const limit = computed(() => isDesktop() ? 10 : 3)

async function loadPrevOracles() {
  await fetchOracles({ queryParameters: oracles.value.prev })
}

async function loadNextOracles() {
  await fetchOracles({ queryParameters: oracles.value.next })
}

await useAsyncData(() => fetchBlockchainStats())

if (process.client) {
  fetchOracles({
    limit: limit.value,
  })
}

</script>

<style scoped>
.oracles-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

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
