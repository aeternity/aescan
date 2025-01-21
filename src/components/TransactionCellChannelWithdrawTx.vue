<template>
  <value-hash-ellipsed
    :hash="transactionData.toId"
    :link-to="`/accounts/${transactionData.toId}`"/>

  <transaction-arrow-left-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>

  <price-label :price="formatAettosToAe(transactionData.amount)"/>
</template>

<script setup>
import { formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
