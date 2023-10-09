<template>
  <span>
    {{ activityDescription }}
  </span>
</template>

<script setup>
const props = defineProps({
  payload: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

const isAuction = computed(() => {
  return formatIsAuction(props.payload.tx.name)
})

const activityDescription = computed(() => {
  console.log('props.activity', props.activity)
  console.log('props.payload', props.payload)
  console.log('isAuction', isAuction)
  console.log('----')
  switch (props.activity) {
  // case 'SpendTxEvent':
  //   if (tx.value.senderId === props.payload.id) {
  //     return 'Transferred to'
  //   }
  //   return 'Received from'
  case 'InternalContractCallEvent':
    return 'Internal Contract Call'
  case 'NameUpdateTxEvent':
    return 'Updated'
  case 'NameTransferTxEvent':
    return 'Transferred'
  case 'NamePreclaimEvent':
    return 'Preclaimed'
  case 'NameClaimEvent':
    return 'Claimed'
  default:
    return 'N/A'
  }
})
</script>
