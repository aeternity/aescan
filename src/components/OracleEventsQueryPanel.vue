<template>
  <app-panel class="oracle-events-query-panel">
    <div class="oracle-events-query-panel__heading">
      Query Details
    </div>
    <dl>
      <dt class="oracle-events-query-panel_term">
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryId }}
        </hint-tooltip>
        Query ID
      </dt>
      <dd class="oracle-events-query-panel__description">
        {{ event.queryId }}
      </dd>

      <dt class="oracle-events-query-panel_term">
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryFee }}
        </hint-tooltip>
        Query Fee
      </dt>
      <dd>
        <price-label :price="event.queryFee"/>
      </dd>

      <dt class="oracle-events-query-panel_term">
        <hint-tooltip variant="dark">
          {{ oraclesHints.queryContent }}
        </hint-tooltip>
        Query
      </dt>
      <dd class="oracle-events-query-panel__description">
        {{ event.query }}
      </dd>

      <dt class="oracle-events-query-panel_term">
        <hint-tooltip variant="dark">
          {{ oraclesHints.responseTtl }}
        </hint-tooltip>
        Response TTL
      </dt>
      <dd>{{ event.responseTtl }}</dd>

      <dt class="oracle-events-query-panel_term">
        <hint-tooltip variant="dark">
          {{ oraclesHints.response }}
        </hint-tooltip>
        Response
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

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

  &__heading {
    font-weight: 700;
    letter-spacing: 0.015em;
    margin-bottom: var(--space-3);
  }

  &__term {
    height: 16px;
  }

  &__description {
    word-break: break-all;
  }
}
</style>
