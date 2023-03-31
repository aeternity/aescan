<template>
  <value-hash-ellipsed
    :hash="transactionData.caller_id"
    :link-to="`/accounts/${transactionData.caller_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contract_id"
    :link-to="`/contracts/${transactionData.contract_id}`"/>

  <app-chip size="sm">
    {{ transactionData.function }}
  </app-chip>
</template>

<script>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import AppChip from '@/components/AppChip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellContractCallTx',
  components: { ValueHashEllipsed, AppChip, TransactionArrowRightIcon },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
