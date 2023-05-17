<template>
  <value-hash-ellipsed
    :hash="transactionData.owner_id"
    :link-to="`/accounts/${transactionData.owner_id}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="transactionData.contract_id"
    :link-to="`/contracts/${transactionData.contract_id}`"/>

  <app-chip size="sm">
    {{ transactionData.auth_fun_name }}
  </app-chip>
</template>

<script setup>
import AppChip from '@/components/AppChip'
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
