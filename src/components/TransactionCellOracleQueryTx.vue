<template>
  <value-hash-ellipsed
    :hash="transactionData.senderId"
    :link-to="`/accounts/${transactionData.senderId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <app-chip
    size="sm"
    class="transaction-cell-oracle-query__query u-ellipsis">
    {{ formatDecodeBase64(transactionData.query) }}
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
.transaction-cell-oracle-query__query {
  display: inline-block;
  max-width: 160px;
}
</style>
