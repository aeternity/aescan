<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>

  <app-tooltip>
    <app-chip size="sm">
      {{ payload.tx.clientTtl }}
    </app-chip>
    <template #tooltip>
      TTL
    </template>
  </app-tooltip>
</template>

<script setup>

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})
</script>
