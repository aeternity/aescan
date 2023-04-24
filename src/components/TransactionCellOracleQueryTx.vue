<template>
  <value-hash-ellipsed
    :hash="transactionData.sender_id"
    :link-to="`/accounts/${transactionData.sender_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.oracle_id"
    :link-to="`/oracles/${transactionData.oracle_id}`"/>

  <app-chip
    size="sm"
    class="transaction-cell-oracle-query__query u-ellipsis">
    {{ formatDecodeBase64(transactionData.query) }}
  </app-chip>
</template>

<script>
import { formatDecodeBase64 } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionCellOracleQueryTx',
  components: { ValueHashEllipsed, TransactionArrowRightIcon, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatDecodeBase64,
  },
}
</script>

<style scoped>
.transaction-cell-oracle-query__query {
  display: inline-block;
  max-width: 160px;
}
</style>
