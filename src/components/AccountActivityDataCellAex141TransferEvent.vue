<template>
  <value-hash-ellipsed
    :hash="activityPayload.contractId"
    :link-to="`/contracts/${activityPayload.contractId}`"/>

  <app-chip size="sm">
    {{ activityPayload.tokenName }}
  </app-chip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const activityPayload = computed(() => props.activity.payload)

</script>
