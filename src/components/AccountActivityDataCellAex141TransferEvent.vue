<template>
  <value-hash-ellipsed
    :hash="activityPayload.recipientId"
    :link-to="`/accounts/${activityPayload.recipientId}`"/>

  <app-chip size="sm">
    {{ activityPayload.tokenName }}
  </app-chip>
</template>

<script setup>
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const activityPayload = computed(() => props.activity.payload)
</script>
