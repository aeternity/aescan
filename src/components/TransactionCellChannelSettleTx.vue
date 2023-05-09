<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount_final)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.responder_amount_final)) }}
  </app-chip>

  <transaction-arrow-right-icon/>

  <app-chip size="sm">
    <value-hash-ellipsed :hash="transactionData.channel_id"/>
  </app-chip>
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
