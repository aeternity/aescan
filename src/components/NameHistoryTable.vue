<template>
  <table>
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ namesHints.eventTransactionHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-switch-button/>
          <hint-tooltip>
            {{ namesHints.eventTime }}
          </hint-tooltip>
        </th>
        <th>
          Activity
          <hint-tooltip>
            {{ namesHints.activity }}
          </hint-tooltip>
        </th>
        <th>
          Data
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="action in actions.data"
        :key="action.hash">
        <td>
          <value-hash-ellipsed
            v-if="action.hash"
            :hash="action.hash"
            :link-to="`/transactions/${action.hash}`"/>
          <template v-else>
            N/A
          </template>
        </td>
        <td>
          <block-time-cell
            :height="action.createdHeight"
            :datetime="action.created"/>
        </td>
        <td>
          <name-history-cell
            :activity="action.type"
            :payload="action.payload"/>
        </td>
        <td>
          <name-history-data-cell
            :activity="action.type"
            :payload="action.payload"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  actions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.name-history-table {
  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }
}
</style>
