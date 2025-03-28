<template>
  <value-hash-ellipsed
    :hash="contractDetails.id"
    :link-to="`/contracts/${contractDetails.id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="eventData[0]"
    :link-to="`/accounts/${eventData[0]}`"/>
  <price-label
    v-if="contractDetails.tokenDetails"
    :price="formatAettosToAe(tokenValue)"
    :contract-id="contractDetails.tokenDetails.contractId"
    :currency="contractDetails.symbol || contractDetails.tokenDetails.symbol"/>
</template>

<script setup>
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

  return formatReduceDecimals(eventData.value[1], props.contractDetails.tokenDetails.decimals)
})
</script>
