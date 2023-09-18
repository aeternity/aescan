<template>
  <span class="u-ellipsis account-activity-data-cell-name-claim-tx-event__name">
    <app-link :to="`/names/${activity.payload.tx.name}`">
      {{ activity.payload.tx.name }}
    </app-link>
  </span>
  <app-chip size="sm">
    {{ formatAePrice(formatAettosToAe(activity.payload.tx.nameFee)) }}
  </app-chip>
</template>

<script setup>
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'

defineProps({
  activity: {
    required: true,
    type: Object,
  },
  accountDetails: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-activity-data-cell-name-claim-tx-event__name {
  display: inline-block;
  max-width: 160px;
}
</style>
