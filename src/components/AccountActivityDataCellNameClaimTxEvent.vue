<template>
  <app-link :to="`/names/${activity.payload.tx.name}`">
    {{ activity.payload.tx.name }}
  </app-link>
  <price-label
    v-if="activity.payload.tx.nameFee"
    :price="formatAettosToAe(activity.payload.tx.nameFee)"/>
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
