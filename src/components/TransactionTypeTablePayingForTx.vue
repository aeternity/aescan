<template>
  <component
    :is="transactionTypeTableComponent"
    :transaction-data="innerTransactionDetails"/>
</template>

<script setup>

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const innerTransactionDetails = computed(() =>
  props.transactionData.tx.tx,
)

const transactionTypeTableComponent = computed(() =>
  defineAsyncComponent(() =>
    import(`@/components/TransactionTypeTable${innerTransactionDetails.value.type}.vue`),
  ),
)
</script>
