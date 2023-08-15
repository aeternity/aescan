<template>
  <app-chip
    size="sm"
    class="u-ellipsis">
    SpendTx
  </app-chip>

  <value-hash-ellipsed
    :hash="transactionDetails.senderId"
    :link-to="`/accounts/${transactionDetails.senderId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionDetails.recipientId"
    :link-to="`/accounts/${transactionDetails.recipientId}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionDetails.amount)) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const transactionDetails = computed(() =>
  props.transactionData.tx.tx,
)
</script>
