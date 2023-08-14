<template>
  <value-hash-ellipsed
    :hash="transactionData.initiatorId"
    :link-to="`/accounts/${transactionData.initiatorId}`"/>

  <app-chip>
    {{ formatAePrice(formatAettosToAe(transactionData.initiatorAmount)) }}
  </app-chip>

  <transaction-plus-icon/>

  <value-hash-ellipsed
    :hash="transactionData.responderId"
    :link-to="`/accounts/${transactionData.responderId}`"/>

  <app-chip>
    {{ formatAePrice(formatAettosToAe(transactionData.responderAmount)) }}
  </app-chip>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
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
