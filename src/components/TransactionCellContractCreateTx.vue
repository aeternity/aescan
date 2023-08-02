<template>
  <value-hash-ellipsed
    :hash="transactionData.ownerId"
    :link-to="`/accounts/${transactionData.ownerId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contractId"
    :link-to="`/contracts/${transactionData.contractId}`"/>
</template>

<script setup>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
