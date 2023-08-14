<template>
  <div class="contract-events-table-condensed">
    <table
      v-for="event in contractEvents.data"
      :key="event.callTxHash"
      class="contract-events-table-condensed__table">
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Call Transaction
            <template #tooltip>
              {{ contractsHints.eventsCallTransaction }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <value-hash-ellipsed
            :hash="event.callTxHash"
            :link-to="`/transactions/${event.callTxHash}`"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Created
            <template #tooltip>
              {{ contractsHints.eventsCreated }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <div>
            <app-link
              :to="`/keyblocks/${event.createdHeight}`">
              {{ event.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="event.created"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Event Name
            <template #tooltip>
              {{ contractsHints.eventsName }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          {{ event.eventName ? event.eventName : 'N/A' }}
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Data
            <template #tooltip>
              {{ contractsHints.eventsData }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <copy-chip
            class="contract-events-table-panel__copy-chip"
            :clipboard-text="removeLineBreaks(event.data)"
            :label="formatEllipseHash(removeLineBreaks(event.data))"/>
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { formatEllipseHash } from '@/utils/format'
import CopyChip from '@/components/CopyChip'

const removeLineBreaks = str => {
  return str.toString().replaceAll('\n', '')
}

defineProps({
  contractEvents: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.contract-events-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-4);
  }

  &__header {
    border-bottom: 1.5px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__cell {
    flex-wrap: wrap;
    gap: var(--space-1);
  }
}
</style>
