<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>
</template>

<script setup>
import ValueHashEllipsed from '~/components/ValueHashEllipsed'

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})

</script>
