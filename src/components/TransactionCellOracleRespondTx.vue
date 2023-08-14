<template>
  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.queryId"/>

  <app-chip>
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
