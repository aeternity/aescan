<template>
  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount_final)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.responder_amount_final)) }}
  </app-chip>

  <value-hash-ellipsed
    :hash="transactionData.channel_id"
    :link-to="`/state-channels/${transactionData.channel_id}`"/>
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
