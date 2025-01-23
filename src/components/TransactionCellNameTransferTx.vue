<template>
  <value-hash-ellipsed
    :hash="transactionData.accountId"
    :link-to="`/accounts/${transactionData.accountId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.recipientId"
    :link-to="`/accounts/${transactionData.recipientId}`"/>

  <app-chip
    size="sm"
    class="u-ellipsis transaction-cell-name-transfer-tx__name">
    {{ transactionData.name }}
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

<style scoped>
.transaction-cell-name-transfer-tx__name {
  display: inline-block;
  max-width: 160px;
}
</style>
