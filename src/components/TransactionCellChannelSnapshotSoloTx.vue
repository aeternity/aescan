<template>
  <value-hash-ellipsed
    :hash="transactionData.fromId"
    :link-to="`/accounts/${transactionData.fromId}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.fromId"/>

  <app-tooltip>
    <app-chip size="sm">
      {{ transactionData.round }}
    </app-chip>
    <template #tooltip>
      Round
    </template>
  </app-tooltip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
