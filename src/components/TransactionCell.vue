<template>
  <div class="transaction-cell">
    <Suspense>
      <component
        :is="transactionCellComponent"
        :transaction-data="cellData"/>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
const props = defineProps({
  transactionType: {
    type: String,
    required: true,
  },
  transactionData: {
    type: Object,
    required: true,
  },
})

const cellData = computed(() => {
  if (props.transactionType === 'PayingForTx') {
    return props.transactionData.tx.tx
  }

  return props.transactionData
})

const transactionCellComponent = computed(() => {
  if (props.transactionType === 'PayingForTx') {
    return defineAsyncComponent(() =>
      import(`@/components/TransactionCell${props.transactionData.tx.tx.type}.vue`),
    )
  }

  return defineAsyncComponent(() =>
    import(`@/components/TransactionCell${props.transactionType}.vue`),
  )
})
</script>

<style scoped>
.transaction-cell {
  display: flex;
  align-items: center;
  gap: var(--space-1);
/* Only the trailing price/fee value (if present) should be pushed to the
     cell's far right; addresses + the arrow between them stay grouped
     together on the left instead of being spread apart by space-between. */
  :deep(.price-label:last-child) {
    margin-left: auto;
  }
}
</style>
