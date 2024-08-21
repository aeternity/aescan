<template>
  <price-label :price="formatAettosToAe(transactionData.initiatorAmountFinal)"/>

  <transaction-plus-icon/>

  <price-label :price="formatAettosToAe(transactionData.responderAmountFinal)"/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>
</template>

<script setup>
import { formatAettosToAe } from '@/utils/format'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
