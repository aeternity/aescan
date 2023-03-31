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

<script>
import AppChip from '@/components/AppChip'
import { formatNullable } from '@/utils/format'

export default {
  name: 'TransactionTypeStatusLabel',
  components: {
    AppChip,
  },
  props: {
    status: {
      type: String,
      default: null,
    },
  },
  methods: {
    formatNullable,
  },
}
</script>
