<template>
  <app-panel class="oracle-events-query-panel">
    <div class="oracle-events-query-panel__heading">
      QueryDetails
    </div>
    <dl>
      <dt>Query ID:</dt>
      <dd>{{ event.queryId }}</dd>
      <dt>Query Fee:</dt>
      <dd>{{ event.queryFee }}</dd>
      <dt>Query:</dt>
      <dd>{{ event.queryFee }}</dd>
      <dt>Response TTL:</dt>
      <dd>{{ event.responseTtl }}</dd>
      <dt>Response:</dt>
      <dd>{{ event.queryFee }}</dd>
    </dl>
  </app-panel>
</template>
<script>
export default {
  name: 'OracleEventsQueryPanel',
  props: {
    event: {},
  },
}
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
    margin-bottom: var(--space-1)
  }

  dl {
    display: grid;
    grid-template-columns: max-content auto;
    gap: var(--space-1) 0
  }

  dt {
    width: 200px;
    grid-column-start: 1;
  }

  dd {
    grid-column-start: 2;
  }
}
</style>
