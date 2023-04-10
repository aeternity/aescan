<template>
  <app-panel class="token-events-panel">
    <token-events-table :events="tokenEvents"/>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import { useTokenDetailsStore } from '~/stores/tokenDetails'
import TokenEventsTable from '~/components/TokenEventsTable.vue'

export default {
  name: 'TokenEventsPanel',
  components: { TokenEventsTable },
  computed: {
    ...mapState(useTokenDetailsStore, ['tokenEvents']),
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
