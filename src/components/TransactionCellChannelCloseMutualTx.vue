<template>
  <price-label :price="formatAettosToAe(transactionData.initiatorAmountFinal)"/>

  +

  <price-label :price="formatAettosToAe(transactionData.responderAmountFinal)"/>

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
