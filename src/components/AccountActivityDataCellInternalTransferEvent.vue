<template>
  <price-label :price="formatAettosToAe(activity.payload.amount)"/>
</template>

<script setup>
import { formatAettosToAe } from '@/utils/format'

defineProps({
  activity: {
    type: Object,
    required: true,
  },
  accountDetails: {
    type: Object,
    default: null,
  },
})
</script>
