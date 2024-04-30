<template>
  <app-chip size="sm">
    {{ tokenValue }}
  </app-chip>
</template>

<script setup>
import { formatNumber, formatReduceDecimals } from '@/utils/format'
import AppChip from '@/components/AppChip'

const props = defineProps({
  contractDetails: {
    required: true,
    type: Object,
  },
  event: {
    required: true,
    type: Object,
  },
})

const eventData = computed(() => props.event.data)
const tokenValue = computed(() => {
  if (!props.contractDetails.tokenDetails || props.contractDetails.contractType === 'AEX-141') {
    return eventData.value[1]
  }

  return formatNumber(
    formatReduceDecimals(eventData.value[1], props.contractDetails.tokenDetails.decimals),
  ) + ` ${props.contractDetails.tokenDetails.symbol}`
})
</script>
