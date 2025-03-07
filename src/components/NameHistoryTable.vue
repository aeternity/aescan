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
          <time-toggle-button/>
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
        <td class="name-history-table__data">
          <value-hash-ellipsed
            v-if="action.hash"
            :hash="action.hash"
            :link-to="`/transactions/${action.hash}`"/>
          <template v-else>
            N/A
          </template>
        </td>
        <td class="name-history-table__data">
          <block-time-cell
            :height="action.createdHeight"
            :timestamp="action.created"/>
        </td>
        <td class="name-history-table__data">
          <name-history-cell
            :activity="action.type"
            :payload="action.payload"/>
        </td>
        <td class="name-history-table__data">
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
  &__data {
    white-space: nowrap;
  }

  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }
}
</style>
