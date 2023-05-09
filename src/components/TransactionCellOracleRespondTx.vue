<template>
  <value-hash-ellipsed
    :hash="transactionData.oracle_id"
    :link-to="`/oracles/${transactionData.oracle_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.query_id"/>

  <app-chip size="sm">
    {{ oracleResponse }}
  </app-chip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatDecodeByteArray, formatEllipseHash } from '@/utils/format'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
const oracleResponse = computed(() =>
  formatEllipseHash(formatDecodeByteArray(props.transactionData.response)),
)
</script>
