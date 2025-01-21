<template>
  <value-hash-ellipsed
    :hash="transactionData.initiatorId"
    :link-to="`/accounts/${transactionData.initiatorId}`"/>

  <price-label :price="formatAettosToAe(transactionData.initiatorAmount)"/>
  +

  <value-hash-ellipsed
    :hash="transactionData.responderId"
    :link-to="`/accounts/${transactionData.responderId}`"/>

  <price-label :price="formatAettosToAe(transactionData.responderAmount)"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>
</template>

<script setup>

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
