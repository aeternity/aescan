<template>
  <app-panel
    v-if="stateChannels"
    class="state-channel-panel">
    <!--      todo counter?-->
    <paginated-content
      :entities="stateChannels"
      pagination-style="history"
      @prev-clicked="loadPrevStateChannels"
      @next-clicked="loadNextStateChannels">
      <state-channels-table-s :state-channels="stateChannels"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStateChannelsStore } from '~/stores/stateChannels2'
import StateChannelsTableS from '~/components/StateChannelsTableS'
import PaginatedContent from '~/components/PaginatedContent'

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
// todo solve naming
</script>

<style scoped>
.state-channel-panel {
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
