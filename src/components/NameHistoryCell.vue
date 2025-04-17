<template>
  {{ activityDescription }}
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
  return props.payload.tx.name ? formatIsAuction(props.payload.tx.name) : false
})

const activityDescription = computed(() => {
  switch (props.activity) {
    case 'NameUpdateTxEvent':
      return 'Updated'
    case 'NameTransferTxEvent':
      return 'Transferred'
    case 'NamePreclaimEvent':
      return 'Name commitment initialized'
    case 'NameClaimEvent':
      if (isAuction.value) {
        return 'Bid placed'
      }
      return 'Activated'

    case 'NameRevokeTxEvent':
      return 'Revoked'

    case 'NameExpiredEvent':
      return 'Expired'

    case 'InternalContractCallEvent':
      return 'Internal Contract Call'
    case 'SpendTxEvent':
      return 'Spend'

    default:
      return 'N/A'
  }
})
</script>
