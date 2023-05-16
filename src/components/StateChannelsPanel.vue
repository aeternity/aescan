<template>
  <app-panel
    v-if="stateChannels"
    class="state-channels-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="stateChannels"
      pagination-style="history"
      :limit="limit"
      @prev-clicked="loadPrevStateChannels"
      @next-clicked="loadNextStateChannels">
      <state-channels-table
        :state-channels="stateChannels"
        class="state-channels-panel__table"/>
      <state-channels-table-condensed
        :state-channels="stateChannels"
        class="state-channels-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useStateChannelsStore } from '@/stores/stateChannels'
import PaginatedContent from '@/components/PaginatedContent'
import StateChannelsTableCondensed from '@/components/StateChannelsTableCondensed'
import { isDesktop } from '~/utils/screen'

const stateChannelsStore = useStateChannelsStore()
const { stateChannels } = storeToRefs(stateChannelsStore)
const { fetchStateChannels } = stateChannelsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const loadPrevStateChannels = () => {
  fetchStateChannels({
    queryParameters: stateChannels.value.prev,
  })
}
const loadNextStateChannels = () => {
  fetchStateChannels({
    queryParameters: stateChannels.value.next,
  })
}

const loadStateChannels = () => {
  fetchStateChannels({ limit: limit.value })
  pageIndex.value = 1
}

if (process.client) {
  loadStateChannels()
}
</script>

<style scoped>
.state-channels-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
