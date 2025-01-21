<template>
  <price-label :price="formatAettosToAe(activity.payload.amount)"/>
</template>

<script setup>
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
