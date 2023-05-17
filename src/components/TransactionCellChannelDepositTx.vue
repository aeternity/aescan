<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channel_id"
    :link-to="`/state-channels/${transactionData.channel_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.fee)) }}
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelDepositTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
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
