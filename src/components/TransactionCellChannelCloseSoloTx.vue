<template>
  <value-hash-ellipsed
    :hash="transactionData.fromId"
    :link-to="`/accounts/${transactionData.fromId}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channelId"
    :link-to="`/state-channels/${transactionData.channelId}`"/>

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
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
