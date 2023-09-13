<template>
  <app-chip size="sm">
    {{ activity.payload.kind }}
  </app-chip>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(activity.payload.amount)) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'

defineProps({
  activity: {
    type: Object,
    required: true,
  },
})
</script>
