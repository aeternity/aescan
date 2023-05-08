<template>
  <app-panel class="oracle-events-query-panel">
    <div class="oracle-events-query-panel__heading">
      QueryDetails
    </div>
    <dl>
      <dt>Query ID:</dt>
      <dd>
        <value-hash-ellipsed
          class="oracle-events-query-panel__hash-ellipse"
          :hash="event.queryId"
          :link-to="`/transactions/${event.queryId}`"/>
        <app-link
          class="oracle-events-query-panel__hash"
          :to="`/transactions/${event.queryId}`">{{ event.queryId }}
        </app-link>
      </dd>
      <dt>Query Fee:</dt>
      <dd>{{ formatAePrice(event.queryFee) }}</dd>
      <dt>Response TTL:</dt>
      <dd>{{ event.responseTtl }}</dd>
    </dl>
  </app-panel>
</template>

<script setup>
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
  background: var(--color-snow) !important;
  font-size: 11px;
  line-height: 16px;

  &__heading {
    font-weight: 700;
    letter-spacing: 0.015em;
    margin-bottom: var(--space-1);
  }

  &__hash {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
