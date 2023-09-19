<template>
  <app-link :to="`/names/${activity.payload.tx.name}`">
    {{ activity.payload.tx.name }}
  </app-link>

  <app-tooltip>
    <app-chip size="sm">
      {{ activity.payload.tx.nameTtl }}
    </app-chip>
    <template #tooltip>
      TTL
    </template>
  </app-tooltip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'

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
