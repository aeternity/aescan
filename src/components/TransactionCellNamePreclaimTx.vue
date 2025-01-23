<template>
  <value-hash-ellipsed
    :hash="transactionData.accountId"
    :link-to="`/accounts/${transactionData.accountId}`"/>
</template>

<script setup>
defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
