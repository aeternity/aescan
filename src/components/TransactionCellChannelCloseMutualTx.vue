<template>
  <app-chip>
    {{ formatAePrice(formatAettosToAe(transactionData.initiatorAmountFinal)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip>
    {{ formatAePrice(formatAettosToAe(transactionData.responderAmountFinal)) }}
  </app-chip>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
