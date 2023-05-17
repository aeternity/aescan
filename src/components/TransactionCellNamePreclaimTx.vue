<template>
  <value-hash-ellipsed
    :hash="transactionData.account_id"
    :link-to="`/accounts/${transactionData.account_id}`"/>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>
