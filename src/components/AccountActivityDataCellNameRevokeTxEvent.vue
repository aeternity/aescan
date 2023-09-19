<template>
  <app-link :to="`/names/${activity.payload.tx.name}`">
    {{ activity.payload.tx.name }}
  </app-link>
</template>

<script setup>
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
