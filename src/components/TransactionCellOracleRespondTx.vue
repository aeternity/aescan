<template>
  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.queryId"/>

  <app-chip
    v-if="oracleResponse"
    size="sm">
    {{ oracleResponse }}
  </app-chip>
</template>

<script setup>
const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const oracleResponse = computed(() => {
  const { response } = props.transactionData
  const decodedResponse = response instanceof Array ? formatDecodeByteArray(response) : response.toString()
  return decodedResponse.length > 8 ? decodedResponse.slice(0, 8) : decodedResponse
})
</script>
