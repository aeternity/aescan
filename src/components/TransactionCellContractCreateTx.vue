<template>
  <value-hash-ellipsed
    :hash="transactionData.ownerId"
    :link-to="`/accounts/${transactionData.ownerId}`"/>

  <template v-if="transactionData.contractId">
    <transaction-arrow-right-icon/>

    <value-hash-ellipsed
      :hash="transactionData.contractId"
      :link-to="`/contracts/${transactionData.contractId}`"/>
  </template>
</template>

<script setup>
defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
