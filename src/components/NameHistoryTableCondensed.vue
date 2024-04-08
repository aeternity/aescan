<template>
  <div>
    <table
      v-for="action of actions.data"
      :key="action.hash"
      class="name-history-table-condensed__table">
      <tbody>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ namesHints.eventTransactionHash }}
              </template>
            </app-tooltip>
          </th>
          <td class="name-history-table-condensed__data">
            <value-hash-ellipsed
              v-if="action.hash"
              :hash="action.hash"
              :link-to="`/transactions/${action.hash}`"/>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            <app-tooltip>
              <time-switch-button/>
              <template #tooltip>
                {{ namesHints.eventTime }}
              </template>
            </app-tooltip>
          </th>
          <td class="name-history-table-condensed__data">
            <block-time-cell
              :height="action.createdHeight"
              :datetime="action.created"/>
          </td>
        </tr>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            <app-tooltip>
              Activity
              <template #tooltip>
                {{ namesHints.activity }}
              </template>
            </app-tooltip>
          </th>
          <td class="name-history-table-condensed__data">
            <name-history-cell
              :activity="action.type"
              :payload="action.payload"/>
          </td>
        </tr>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            Data
          </th>
          <td class="name-history-table-condensed__data">
            <name-history-data-cell
              :activity="action.type"
              :payload="action.payload"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppTooltip from '@/components/AppTooltip'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  actions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.name-history-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
