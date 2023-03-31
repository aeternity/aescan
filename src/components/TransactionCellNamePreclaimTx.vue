<template>
  <value-hash-ellipsed
    :hash="transactionData.account_id"
    :link-to="`/accounts/${transactionData.account_id}`"/>
</template>

<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellNamePreclaimTx',
  components: {
    ValueHashEllipsed,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
