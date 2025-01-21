<template>
  <value-hash-ellipsed
    :hash="activity.payload.tx.contractId"
    :link-to="`/contracts/${activity.payload.tx.contractId}`"/>
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
