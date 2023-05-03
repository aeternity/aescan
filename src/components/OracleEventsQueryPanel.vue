<template>
  <app-panel class="oracle-events-query-panel">
    <div class="oracle-events-query-panel__heading">
      QueryDetails
    </div>
    <dl>
      <dt>Query ID:</dt>
      <dd>{{ event.queryId }}</dd>
      <dt>Query Fee:</dt>
      <dd>{{ formatAePrice(event.queryFee) }}</dd>
      <dt v-if="isResponseAvailable">
        Query:
      </dt>
      <dd v-if="isResponseAvailable">
        {{ event.query }}
      </dd>
      <dt>Response TTL:</dt>
      <dd>{{ event.responseTtl }}</dd>
      <dt v-if="isResponseAvailable">
        Response:
      </dt>
      <dd v-if="isResponseAvailable">
        {{ event.response }}
      </dd>
    </dl>
  </app-panel>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
  isResponseAvailable: {
    type: Boolean,
    required: true,
  },
})
</script>

<style>
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
}
</style>
