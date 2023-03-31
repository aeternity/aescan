<template>
  <value-hash-ellipsed
    :hash="transactionData.account_id"
    :link-to="`/accounts/${transactionData.account_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.recipient_id"
    :link-to="`/accounts/${transactionData.recipient_id}`"/>

  <app-chip
    size="sm"
    class="u-ellipsis transaction-cell-name-transfer-tx__name">
    {{ transactionData.name }}
  </app-chip>
</template>

<script>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellNameTransferTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style scoped>
.transaction-cell-name-transfer-tx__name {
  display: inline-block;
  max-width: 160px;
}
</style>
