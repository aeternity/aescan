<template>
  <value-hash-ellipsed
    :hash="transactionData.oracle_id"
    :link-to="`/accounts/${transactionData.oracle_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed :hash="transactionData.query_id"/>

  <app-chip size="sm">
    {{ oracleResponse }}
  </app-chip>
</template>

<script>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatDecodeByteArray, formatEllipseHash } from '@/utils/format'

export default {
  name: 'TransactionCellOracleRespondTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    oracleResponse() {
      return formatEllipseHash(formatDecodeByteArray(this.transactionData.response))
    },
  },
}
</script>
