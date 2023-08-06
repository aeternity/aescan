<template>
  <span v-if="activity.kind !== 'reward_block'">N/A</span>
  <template v-else>
    <app-chip size="sm">
      {{ formatAePrice(formatAettosToAe(activity.payload.amount)) }}
    </app-chip>
  </template>
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
