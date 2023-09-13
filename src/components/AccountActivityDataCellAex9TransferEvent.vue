<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="activityPayload.recipientId"
    :link-to="`/accounts/${activityPayload.recipientId}`"/>

  <app-chip size="sm">
    {{ tokenValue }}
  </app-chip>
</template>

<script setup>
import { formatNumber, formatReduceDecimals } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const activityPayload = computed(() => props.activity.payload)
const tokenValue = computed(() =>
  formatNumber(
    formatReduceDecimals(activityPayload.value.amount, activityPayload.value.decimals),
  ) + ` ${activityPayload.value.tokenSymbol}`,
)
</script>
