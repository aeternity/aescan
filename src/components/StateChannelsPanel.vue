<template>
  <app-panel
    v-if="stateChannels"
    class="state-channels-panel">
    <!--      todo counter?-->
    <paginated-content
      :entities="stateChannels"
      pagination-style="history"
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
import { useStateChannelsStore } from '@/stores/stateChannels'
import PaginatedContent from '@/components/PaginatedContent'
import StateChannelsTableCondensed from '@/components/StateChannelsTableCondensed'

const stateChannelsStore = useStateChannelsStore()
const { stateChannels } = storeToRefs(stateChannelsStore)
const { fetchStateChannels } = stateChannelsStore

const loadPrevStateChannels = () => {
  fetchStateChannels(stateChannels.value.prev)
}
const loadNextStateChannels = () => {
  fetchStateChannels(stateChannels.value.next)
}

const loadStateChannels = () => {
  fetchStateChannels()
}

if (process.client) {
  loadStateChannels()
}
</script>

<style scoped>
.state-channels-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-5) var(--space-4) var(--space-4);
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
