<template>
  <value-hash-ellipsed
    :hash="transactionData.senderId"
    :link-to="`/accounts/${transactionData.senderId}`"/>

  <transaction-arrow-right-icon/>
  <app-link
    v-if="hasRecipientName"
    :to="`/names/${transactionData.recipient.name}`"
    class="transaction-cell-spend-tx__chain-name u-ellipsis">
    {{ transactionData.recipient.name }}
  </app-link>
  <value-hash-ellipsed
    v-else
    :hash="transactionData.recipientId"
    :link-to="`/accounts/${transactionData.recipientId}`"/>

  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(transactionData.amount)) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppLink from '@/components/AppLink'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const hasRecipientName = computed(() => !!props.transactionData.recipient)
</script>

<style scoped>
.transaction-cell-spend-tx {
  &__chain-name {
    display: inline-block;
    max-width: 160px;
  }
}
</style>
