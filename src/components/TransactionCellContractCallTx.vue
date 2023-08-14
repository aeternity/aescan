<template>
  <value-hash-ellipsed
    :hash="transactionData.callerId"
    :link-to="`/accounts/${transactionData.callerId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contractId"
    :link-to="`/contracts/${transactionData.contractId}`"/>

  <app-chip>
    {{ transactionData.function }}
  </app-chip>
</template>

<script setup>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import AppChip from '@/components/AppChip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
