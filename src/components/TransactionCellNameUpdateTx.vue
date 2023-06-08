<template>
  <value-hash-ellipsed
    :hash="transactionData.account_id"
    :link-to="`/accounts/${transactionData.account_id}`"/>

  <transaction-arrow-right-icon/>
  <span class="u-ellipsis transaction-cell-name-update-tx__name">
    <app-link :to="`/names/${transactionData.name}`">
      {{ transactionData.name }}
    </app-link>
  </span>
  <app-chip size="sm">
    {{ transactionData.name_ttl }}
  </app-chip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import AppLink from '@/components/AppLink'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-cell-name-update-tx__name {
  display: inline-block;
  max-width: 160px;
}
</style>
