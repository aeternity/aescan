<template>
  <value-hash-ellipsed
    :hash="transactionData.account_id"
    :link-to="`/accounts/${transactionData.account_id}`"/>
  <transaction-arrow-right-icon/>
  <span class="u-ellipsis transaction-cell-name-revoke-tx__name">
    <app-link :to="`/names/${transactionData.name}`">
      {{ transactionData.name }}
    </app-link>
  </span>
</template>

<script>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppLink from '@/components/AppLink'

export default {
  name: 'TransactionCellNameRevokeTx',
  components: { AppLink, ValueHashEllipsed, TransactionArrowRightIcon },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style scoped>
.transaction-cell-name-revoke-tx__name {
  display: inline-block;
  max-width: 160px;
}
</style>
