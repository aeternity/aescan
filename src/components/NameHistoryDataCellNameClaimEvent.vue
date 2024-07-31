<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>

  <app-tooltip>
    <price-label
      v-if="formatAettosToAe(payload.tx.nameFee)"
      :price="formatAettosToAe(payload.tx.nameFee)"/>
    <template #tooltip>
      Fee
    </template>
  </app-tooltip>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})

</script>
