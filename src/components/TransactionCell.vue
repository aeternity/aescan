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

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'TransactionCell',
  props: {
    transactionType: {
      type: String,
      required: true,
    },
    transactionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellData() {
      if (this.transactionType === 'PayingForTx') {
        return this.transactionData.tx.tx
      }

      return this.transactionData
    },
    transactionCellComponent() {
      if (this.transactionType === 'PayingForTx') {
        return defineAsyncComponent(() =>
          import(`@/components/TransactionCell${this.transactionData.tx.tx.type}.vue`),
        )
      }

      return defineAsyncComponent(() =>
        import(`@/components/TransactionCell${this.transactionType}.vue`),
      )
    },
  },
}
</script>

<style scoped>
.transaction-cell {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;

  @media(--desktop) {
    justify-content: space-between;
  }
}
</style>
