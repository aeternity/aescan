<template>
  <span>
    <!--todo layout-->
    <value-hash-ellipsed
      :hash="payload.tx.accountId"
      :link-to="`/accounts/${payload.tx.accountId}`"/>
  </span>
</template>

<script setup>
import ValueHashEllipsed from '~/components/ValueHashEllipsed'

const props = defineProps({
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
