<template>
  <app-panel class="token-events-panel">
    <paginated-content
      :entities="tokenEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <token-events-table
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="token-events-panel__table"/>
      <token-events-table-condensed
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="token-events-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useTokenDetailsStore } from '~/stores/tokenDetails'
import TokenEventsTable from '~/components/TokenEventsTable.vue'
import TokenEventsTableCondensed from '~/components/TokenEventsTableCondensed.vue'

export default {
  name: 'TokenEventsPanel',
  components: { TokenEventsTableCondensed, TokenEventsTable },
  computed: {
    ...mapState(useTokenDetailsStore, ['tokenEvents']),
  },
  methods: {
    ...mapActions(useTokenDetailsStore, ['fetchTokenEvents']),
    loadPrevEvents() {
      this.fetchTokenEvents({ queryParameters: this.tokenEvents.prev })
    },
    loadNextEvents() {
      this.fetchTokenEvents({ queryParameters: this.tokenEvents.next })
    },
  },
}
</script>
<style scoped>
.token-events-panel {
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
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
