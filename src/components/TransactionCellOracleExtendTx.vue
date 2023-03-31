<template>
  <value-hash-ellipsed :hash="transactionData.oracle_id"/>

  <app-chip size="sm">
    TTL {{ transactionData.oracle_ttl.value }}
  </app-chip>
</template>

<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'

export default {
  name: 'TransactionCellOracleExtendTx',
  components: { ValueHashEllipsed, AppChip },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>
