<template>
  <span v-if="activity.payload?.kind !== 'reward_block'">N/A</span>
  <app-chip
    v-else
    size="sm">
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
