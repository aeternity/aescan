<template>
  <span class="u-ellipsis account-activity-data-cell-name-revoke-tx-event__name">
    <app-link :to="`/names/${activity.payload.tx.name}`">
      {{ activity.payload.tx.name }}
    </app-link>
  </span>
</template>

<script setup>
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
.account-activity-data-cell-name-revoke-tx-event__name {
  display: inline-block;
  max-width: 160px;
}
</style>
