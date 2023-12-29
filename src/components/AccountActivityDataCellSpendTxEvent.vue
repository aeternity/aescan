<template>
  <value-hash-ellipsed
    v-if="isRecipient"
    :hash="activity.payload.tx.recipientId"
    :link-to="`/accounts/${activity.payload.tx.recipientId}`"/>
  <value-hash-ellipsed
    v-else
    :hash="activity.payload.tx.senderId"
    :link-to="`/accounts/${activity.payload.tx.senderId}`"/>
  <price-label :price="formatAettosToAe(activity.payload.tx.amount)"/>
</template>

<script setup>
const props = defineProps({
  activity: {
    required: true,
    type: Object,
  },
  accountDetails: {
    type: Object,
    required: true,
  },
})

const isRecipient = computed(() => {
  return props.activity.payload?.tx.senderId === props.accountDetails.id
})
</script>
