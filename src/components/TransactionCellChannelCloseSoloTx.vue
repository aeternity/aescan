<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>
  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.channel_id"/>

  <app-chip size="sm">
    Round {{ transactionData.round }}
  </app-chip>
</template>

<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'

export default {
  name: 'TransactionCellChannelCloseSoloTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
