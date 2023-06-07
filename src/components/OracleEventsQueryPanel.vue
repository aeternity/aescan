<template>
  <app-panel class="oracle-events-query-panel">
    <div class="oracle-events-query-panel__heading">
      Query Details
    </div>
    <dl>
      <dt>
        Query ID:
        <hint-tooltip>
          {{ oraclesHints.queryId }}
        </hint-tooltip>
      </dt>
      <dd>{{ event.queryId }}</dd>

      <dt>
        Query Fee:
        <hint-tooltip>
          {{ oraclesHints.queryFee }}
        </hint-tooltip>
      </dt>
      <dd>{{ formatAePrice(event.queryFee) }}</dd>

      <dt>
        Query:
        <hint-tooltip>
          {{ oraclesHints.queryContent }}
        </hint-tooltip>
      </dt>
      <dd class="oracle-events-query-panel__description">
        {{ event.query }}
      </dd>

      <dt>
        Response TTL:
        <hint-tooltip>
          {{ oraclesHints.responseTtl }}
        </hint-tooltip>
      </dt>
      <dd>{{ event.responseTtl }}</dd>

      <dt>
        Response:
        <hint-tooltip>
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
  padding: var(--space-3);
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  &__heading {
    font-weight: 700;
    letter-spacing: 0.015em;
    margin-bottom: var(--space-1);
  }

  &__description {
    word-break: break-all;
  }
}
</style>
