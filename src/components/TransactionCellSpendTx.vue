<template>
  <value-hash-ellipsed
    :hash="transactionData.sender_id"
    :link-to="`/accounts/${transactionData.sender_id}`"/>

  <transaction-arrow-right-icon/>
  <app-link
    v-if="hasRecipientName"
    :to="`/names/${transactionData.recipient.name}`"
    class="transaction-cell-spend-tx__chain-name u-ellipsis">
    {{ transactionData.recipient.name }}
  </app-link>
  <value-hash-ellipsed
    v-else
    :hash="transactionData.recipient_id"
    :link-to="`/accounts/${transactionData.recipient_id}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.amount)) }}
  </app-chip>
</template>

<script>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppLink from '@/components/AppLink'

export default {
  name: 'TransactionCellSpendTx',
  components: {
    AppLink,
    ValueHashEllipsed,
    TransactionArrowRightIcon,
    AppChip,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    hasRecipientName() {
      return !!this.transactionData.recipient
    },
  },
  methods: {
    formatAePrice,
    formatAettosToAe,
  },
}
</script>

<style scoped>
.transaction-cell-spend-tx {
  &__chain-name {
    display: inline-block;
    max-width: 160px;
  }
}
</style>
