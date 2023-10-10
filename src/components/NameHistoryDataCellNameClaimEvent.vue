<template>
  <value-hash-ellipsed
    :hash="payload.tx.accountId"
    :link-to="`/accounts/${payload.tx.accountId}`"/>

  <app-tooltip>
    <app-chip size="sm">
      {{ formatAePrice(formatAettosToAe(payload.tx.nameFee), null) }}
    </app-chip>
    <template #tooltip>
      Fee
    </template>
  </app-tooltip>
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
