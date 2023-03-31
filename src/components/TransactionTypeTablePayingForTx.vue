<template>
  <component
    :is="transactionTypeTableComponent"
    :transaction-data="innerTransactionDetails"/>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'TransactionTypeTablePayingForTx',
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    transactionTypeTableComponent() {
      return defineAsyncComponent(() =>
        import(`@/components/TransactionTypeTable${this.innerTransactionDetails.type}.vue`),
      )
    },
    innerTransactionDetails() {
      return this.transactionData.tx.tx
    },
  },
}
</script>
