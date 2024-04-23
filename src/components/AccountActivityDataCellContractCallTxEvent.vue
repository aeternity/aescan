<template>
  <value-hash-ellipsed
    :hash="activity.payload.tx.contractId"
    :link-to="`/contracts/${activity.payload.tx.contractId}`"/>

  <app-chip size="sm">
    {{ activity.payload.tx.function }}
  </app-chip>
  <app-chip
    v-if="activity.payload.tx.function === 'add_vote'"
    size="sm">
    {{ formatAePrice(formatAettosToAe(activity.payload.tx.amount)) }}
  </app-chip>
</template>

<script setup>

import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

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
