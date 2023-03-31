<template>
  <value-hash-ellipsed
    :hash="transactionData.to_id"
    :link-to="`/accounts/${transactionData.to_id}`"/>

  <transaction-arrow-left-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channel_id"
    :link-to="`/accounts/${transactionData.channel_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.amount)) }}
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowLeftIcon from '@/components/TransactionArrowLeftIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelWithdrawTx',
  components: { ValueHashEllipsed, TransactionArrowLeftIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatAettosToAe,
    formatAePrice,
  },
}
</script>
