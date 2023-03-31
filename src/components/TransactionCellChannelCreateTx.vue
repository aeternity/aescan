<template>
  <value-hash-ellipsed
    :hash="transactionData.initiator_id"
    :link-to="`/accounts/${transactionData.initiator_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount)) }}
  </app-chip>

  <transaction-plus-icon/>

  <value-hash-ellipsed
    :hash="transactionData.initiator_id"
    :link-to="`/accounts/${transactionData.initiator_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.initiator_amount)) }}
  </app-chip>

  <transaction-arrow-right-icon/>
  <app-chip size="sm">
    <value-hash-ellipsed :hash="transactionData.channel_id"/>
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import TransactionPlusIcon from '@/components/TransactionPlusIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellChannelCreateTx',
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
    formatAePrice,
    formatAettosToAe,
  },
}
</script>
