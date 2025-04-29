<template>
  <price-label
    :price="formatAettosToAe(activity.payload.amount)"
    :contract-id="activity.payload.tx.tx.arguments[0].value"
    :currency="activity.payload.tokenName"/>
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
