<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>
</template>

<script setup>

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})

</script>
