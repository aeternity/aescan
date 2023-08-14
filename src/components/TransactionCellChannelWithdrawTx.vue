<template>
  <value-hash-ellipsed
    :hash="transactionData.toId"
    :link-to="`/accounts/${transactionData.toId}`"/>

  <transaction-arrow-left-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>

  <app-chip>
    {{ formatAePrice(formatAettosToAe(transactionData.amount)) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowLeftIcon from '@/components/TransactionArrowLeftIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
