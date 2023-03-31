<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.from_id"/>

  <app-chip size="sm">
    Round {{ transactionData.round }}
  </app-chip>
</template>

<script>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelSnapshotSoloTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
