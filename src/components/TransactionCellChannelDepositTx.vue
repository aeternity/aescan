<template>
  <value-hash-ellipsed
    :hash="transactionData.fromId"
    :link-to="`/accounts/${transactionData.fromId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>

  <price-label :price="formatAettosToAe(transactionData.fee)"/>
</template>

<script setup>

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
