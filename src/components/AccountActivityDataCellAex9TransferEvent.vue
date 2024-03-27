<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>
  <price-label
    :price="tokenValue"
    :contract-id="activityPayload.contractId"
    :currency="activityPayload.tokenSymbol"/>
</template>

<script setup>
import { formatReduceDecimals } from '@/utils/format'
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
  formatReduceDecimals(activityPayload.value.amount, activityPayload.value.decimals),
)
</script>
