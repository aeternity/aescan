<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>
  <template v-if="activityPayload.function === 'Chain.spend'">
    <transaction-arrow-right-icon/>
    <app-chip size="sm">
      {{ formatAePrice(formatAettosToAe(activityPayload.internalTx.amount)) }}
    </app-chip>
  </template>
  <app-chip size="sm">
    {{ activityPayload.function }}
  </app-chip>
</template>

<script setup>
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
</script>
