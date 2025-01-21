<template>
  <value-hash-ellipsed
    :hash="transactionData.accountId"
    :link-to="`/accounts/${transactionData.accountId}`"/>
  <transaction-arrow-right-icon/>
  <span class="u-ellipsis transaction-cell-name-revoke-tx__name">
    <app-link :to="`/names/${transactionData.name}`">
      {{ transactionData.name }}
    </app-link>
  </span>
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
.transaction-cell-name-revoke-tx__name {
  display: inline-block;
  max-width: 160px;
}
</style>
