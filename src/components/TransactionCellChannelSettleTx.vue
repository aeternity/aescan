<template>
  <value-hash-ellipsed
    :hash="transactionData.from_id"
    :link-to="`/accounts/${transactionData.from_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount_final)) }}
  </app-chip>

  <transaction-plus-icon/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.responder_amount_final)) }}
  </app-chip>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.channel_id"
    :link-to="`/state-channels/${transactionData.channel_id}`"/>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelSlashTx',
  components: {
    ValueHashEllipsed,
    TransactionPlusIcon,
    TransactionArrowRightIcon,
    AppChip,
  },
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
