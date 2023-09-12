<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="activityPayload.internalTx.recipientId"
    :link-to="`/accounts/${activityPayload.internalTx.recipientId}`"/>
</template>

<script setup>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const activityPayload = computed(() => props.activity.payload)

</script>
