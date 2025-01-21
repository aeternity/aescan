<template>
  <app-chip
    v-if="status"
    :variant="status === 'ok' ? 'success' : 'error'">
    {{ status === "ok" ? "Success" : "Revert" }}
  </app-chip>
  <template v-else>
    {{ formatNullable(status) }}
  </template>
</template>

<script setup>

import { formatNullable } from '@/utils/format'

defineProps({
  status: {
    type: String,
    default: null,
  },
})
</script>
