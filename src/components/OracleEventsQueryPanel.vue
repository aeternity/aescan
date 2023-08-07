<template>
  <app-panel class="oracle-events-query-panel">
    <template #heading>
      Query Details
    </template>
    <dl>
      <dt class="oracle-events-query-panel_term">
        Query ID:
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryId }}
        </hint-tooltip>
      </dt>
      <dd>{{ event.queryId }}</dd>

      <dt class="oracle-events-query-panel_term">
        Query Fee:
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryFee }}
        </hint-tooltip>
      </dt>
      <dd>{{ formatAePrice(event.queryFee) }}</dd>

      <dt class="oracle-events-query-panel_term">
        Query:
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryContent }}
        </hint-tooltip>
      </dt>
      <dd class="oracle-events-query-panel__description">
        {{ event.query }}
      </dd>

      <dt class="oracle-events-query-panel_term">
        Response TTL:
        <hint-tooltip variant="dark">
          {{ oraclesHints.responseTtl }}
        </hint-tooltip>
      </dt>
      <dd>{{ event.responseTtl }}</dd>

      <dt class="oracle-events-query-panel_term">
        Response:
        <hint-tooltip variant="dark">
          {{ oraclesHints.response }}
        </hint-tooltip>
      </dt>
      <dd class="oracle-events-query-panel__description">
        {{ event.response }}
      </dd>
    </dl>
  </app-panel>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'
import HintTooltip from '@/components/HintTooltip'
import AppPanel from '@/components/AppPanel'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.oracle-events-query-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  &__term {
    height: 16px;
  }

  &__description {
    word-break: break-all;
  }
}
</style>
