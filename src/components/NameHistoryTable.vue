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
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="action in actions?.data"
        :key="action.hash">
        <td>
          <value-hash-ellipsed
            :hash="action.hash"
            :link-to="`/transactions/${action.hash}`"/>
        </td>
        <td>
          <div>
            <app-link
              :to="`/keyblocks/${action.createdHeight}`">
              {{ action.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="action.created"/>
        </td>
        <td>
          <div>
            {{ action.type }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { namesHints } from '@/utils/hints/namesHints'
import HintTooltip from '~/components/HintTooltip'
import DatetimeLabel from '@/components/DatetimeLabel'

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
