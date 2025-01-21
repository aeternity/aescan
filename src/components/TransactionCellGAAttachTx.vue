<template>
  <value-hash-ellipsed
    :hash="transactionData.ownerId"
    :link-to="`/accounts/${transactionData.ownerId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contractId"
    :link-to="`/contracts/${transactionData.contractId}`"/>

  <app-chip size="sm">
    {{ transactionData.authFunName }}
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
