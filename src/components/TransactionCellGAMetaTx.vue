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

  <price-label :price="formatAettosToAe(transactionDetails.amount)"/>
</template>

<script setup>
import { formatAettosToAe } from '@/utils/format'
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
