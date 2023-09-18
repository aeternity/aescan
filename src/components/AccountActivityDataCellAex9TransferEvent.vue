<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>

  <app-chip size="sm">
    {{ tokenValue }}
  </app-chip>
</template>

<script setup>
import { formatNumber, formatReduceDecimals } from '@/utils/format'
import AppChip from '@/components/AppChip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
  accountDetails: {
    type: Object,
    default: null,
  },
})

const activityPayload = computed(() => props.activity.payload)
const tokenValue = computed(() =>
  formatNumber(
    formatReduceDecimals(activityPayload.value.amount, activityPayload.value.decimals),
  ) + ` ${activityPayload.value.tokenSymbol}`,
)
</script>
