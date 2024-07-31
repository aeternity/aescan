<template>
  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <app-tooltip>
    <price-label :price="formatAettosToAe(transactionData.fee)"/>
    <template #tooltip>
      FEE
    </template>
  </app-tooltip>
</template>

<script setup>
import { formatAettosToAe } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
