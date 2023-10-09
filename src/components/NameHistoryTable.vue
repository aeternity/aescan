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
          Time
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
            :hash="action.hash"
            :link-to="`/transactions/${action.hash}`"/>
        </td>
        <td>
          <block-time-cell
            :height="action.createdHeight"
            :datetime="action.created"/>
        </td>
        <td>
          <div>
            <name-history-cell
              :activity="action.type"
              :payload="action.payload"/>
          </div>
        </td>
        <td>
          <div>
            <name-history-data-cell
              :activity="action.type"
              :payload="action.payload"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { namesHints } from '@/utils/hints/namesHints'
import HintTooltip from '@/components/HintTooltip'
import BlockTimeCell from '~/components/BlockTimeCell'
import NameHistoryCell from '~/components/NameHistoryCell'

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
