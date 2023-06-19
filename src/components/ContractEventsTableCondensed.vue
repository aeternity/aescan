<template>
  <div class="contract-events-table-condensed">
    <table
      v-for="event in contractEvents.data"
      :key="event.callTxHash"
      class="contract-events-table-condensed__table">
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Call transaction
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
            {{ event.createdHeight }}
          </div>
          <datetime-label :datetime="event.created"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Name
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
            Arguments
            <template #tooltip>
              {{ contractsHints.eventsArguments }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <copy-chip
            class="contract-events-table-panel__copy-chip"
            :clipboard-text="removeLineBreaks(event.args)"
            :label="formatEllipseHash(removeLineBreaks(event.args))"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          Data
        </th>
        <td class="contract-events-table-condensed__data">
          {{ event.data }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { contractsHints } from '../utils/hints/contractsHints'
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
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    vertical-align: top;
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
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
