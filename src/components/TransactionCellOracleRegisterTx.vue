<template>
  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <app-tooltip>
    <app-chip>
      {{ formatAePrice(formatAettosToAe(transactionData.fee)) }}
    </app-chip>
    <template #tooltip>
      FEE
    </template>
  </app-tooltip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
