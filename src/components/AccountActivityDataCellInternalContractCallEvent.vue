<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>
  <template v-if="activityPayload.function === 'Chain.spend'">
    <transaction-arrow-right-icon/>
    <price-label :price="formatAettosToAe(activityPayload.internalTx.amount)"/>
  </template>
  <app-chip size="sm">
    {{ activityPayload.function }}
  </app-chip>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatAettosToAe } from '@/utils/format'

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
</script>
