<template>
  <value-hash-ellipsed
    :hash="transactionData.callerId"
    :link-to="`/accounts/${transactionData.callerId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contractId"
    :link-to="`/contracts/${transactionData.contractId}`"/>

  <app-chip size="sm">
    {{ transactionData.function }}
  </app-chip>
</template>

<script setup>

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
