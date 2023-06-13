<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>

  <transaction-arrow-right-icon/>

  <app-tooltip>
    <value-hash-ellipsed
      :hash="transactionData.channel_id"
      :link-to="`/state-channels/${transactionData.channel_id}`"/>
    <template #tooltip>
      {{ contractsHints.hash }}
    </template>
  </app-tooltip>

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
