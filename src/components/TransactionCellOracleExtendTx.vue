<template>
  <value-hash-ellipsed
    :hash="transactionData.oracle_id"
    :link-to="`/oracles/${transactionData.oracle_id}`"/>

  <app-chip size="sm">
    TTL {{ transactionData.oracle_ttl.value }}
  </app-chip>
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
