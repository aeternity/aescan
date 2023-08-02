<template>
  <value-hash-ellipsed
    :hash="transactionData.fromId"
    :link-to="`/accounts/${transactionData.fromId}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiatorAmountFinal)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.responderAmountFinal)) }}
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
