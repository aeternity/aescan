<template>
  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount_final)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.responder_amount_final)) }}
  </app-chip>

  <app-chip size="sm">
    <value-hash-ellipsed :hash="transactionData.channel_id"/>
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelCloseMutualTx',
  components: { ValueHashEllipsed, TransactionPlusIcon, AppChip },
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
