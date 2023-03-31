<template>
  <value-hash-ellipsed
    :hash="transactionData.owner_id"
    :link-to="`/accounts/${transactionData.owner_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contract_id"
    :link-to="`/contracts/${transactionData.contract_id}`"/>
</template>

<script>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellContractCreateTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
