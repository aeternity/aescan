<template>
  <value-hash-ellipsed
    :hash="contractDetails.id"
    :link-to="`/contracts/${contractDetails.id}`"/>

  <transaction-arrow-right-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(eventData[1])) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

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
</script>
