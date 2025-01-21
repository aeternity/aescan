<template>
  <value-hash-ellipsed
    :hash="activity.payload.tx.contractId"
    :link-to="`/contracts/${activity.payload.tx.contractId}`"/>

  <app-chip size="sm">
    {{ activity.payload.tx.function }}
  </app-chip>

  <price-label
    v-if="activity.payload.tx.amount !== 0"
    :price="formatAettosToAe(activity.payload.tx.amount)"/>
</template>

<script setup>

import { formatAettosToAe } from '@/utils/format'

defineProps({
  activity: {
    required: true,
    type: Object,
  },
  accountDetails: {
    type: Object,
    default: null,
  },
})
</script>
