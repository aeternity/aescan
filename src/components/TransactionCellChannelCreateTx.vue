<template>
  <value-hash-ellipsed
    :hash="transactionData.initiatorId"
    :link-to="`/accounts/${transactionData.initiatorId}`"/>

  <price-label :price="formatAettosToAe(transactionData.initiatorAmount)"/>
  <transaction-plus-icon/>

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
import { formatAettosToAe } from '@/utils/format'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
