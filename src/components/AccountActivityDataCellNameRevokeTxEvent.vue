<template>
  <app-link :to="`/names/${activity.payload.tx.name}`">
    {{ activity.payload.tx.name }}
  </app-link>
</template>

<script setup>
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
