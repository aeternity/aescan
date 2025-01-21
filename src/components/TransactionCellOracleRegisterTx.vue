<template>
  <value-hash-ellipsed
    :hash="transactionData.oracleId"
    :link-to="`/oracles/${transactionData.oracleId}`"/>

  <app-tooltip>
    <price-label :price="formatAettosToAe(transactionData.fee)"/>
    <template #tooltip>
      FEE
    </template>
  </app-tooltip>
</template>

<script setup>
defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
