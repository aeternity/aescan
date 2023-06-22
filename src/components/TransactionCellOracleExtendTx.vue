<template>
  <value-hash-ellipsed
    :hash="transactionData.oracle_id"
    :link-to="`/oracles/${transactionData.oracle_id}`"/>

  <app-tooltip>
    <app-chip size="sm">
      {{ transactionData.oracle_ttl.value }}
    </app-chip>
    <template #tooltip>
      TTL
    </template>
  </app-tooltip>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
