<template>
  <app-chip
    size="sm"
    class="u-ellipsis">
    SpendTx
  </app-chip>

  <value-hash-ellipsed
    :hash="transactionDetails.sender_id"
    :link-to="`/accounts/${transactionDetails.sender_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionDetails.recipient_id"
    :link-to="`/accounts/${transactionDetails.recipient_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionDetails.amount)) }}
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellPayingForTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    transactionDetails() {
      return this.transactionData.tx.tx
    },
  },
  methods: {
    formatAePrice,
    formatAettosToAe,
  },
}
</script>
