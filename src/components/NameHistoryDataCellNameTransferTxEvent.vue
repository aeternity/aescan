<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>

  <transaction-arrow-right-icon/>

  <value-hash-ellipsed
    :hash="payload.tx.recipientId"
    :link-to="`/accounts/${payload.tx.recipientId}`"/>
</template>

<script setup>
import ValueHashEllipsed from '~/components/ValueHashEllipsed'

defineProps({
  payload: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

</script>
