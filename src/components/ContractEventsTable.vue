<template>
  <table>
    <tr>
      <th>
        Call transaction
        <hint-tooltip>
          {{ contractsHints.eventsCallTransaction }}
        </hint-tooltip>
      </th>
      <th>
        Created
        <hint-tooltip>
          {{ contractsHints.eventsCreated }}
        </hint-tooltip>
      </th>
      <th>
        Name
        <hint-tooltip>
          {{ contractsHints.eventsName }}
        </hint-tooltip>
      </th>
      <th>
        Arguments
        <hint-tooltip>
          {{ contractsHints.eventsArguments }}
        </hint-tooltip>
      </th>
      <th>
        Data
        <hint-tooltip>
          {{ contractsHints.data }}
        </hint-tooltip>
      </th>
    </tr>
    <tr
      v-for="event in contractEvents.data"
      :key="event.callTxHash">
      <td class="contract-events-table__transaction">
        <hash-symbol>th</hash-symbol>
        <value-hash-ellipsed
          :hash="event.callTxHash"
          :link-to="`/transactions/${event.callTxHash}`"/>
      </td>
      <td>
        <div>
          {{ event.createdHeight }}
        </div>
        <datetime-label :datetime="event.created"/>
      </td>
      <td>
        {{ event.eventName ? event.eventName : 'N/A' }}
      </td>
      <td>
        <copy-chip
          :clipboard-text="removeLineBreaks(event.args)"
          :label="formatEllipseHash(removeLineBreaks(event.args))"/>
      </td>
      <td class="contract-events-table__event-data">
        {{ event.data }}
      </td>
    </tr>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import DatetimeLabel from '@/components/DatetimeLabel'
import CopyChip from '@/components/CopyChip'
import HashSymbol from '@/components/HashSymbol'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatEllipseHash } from '@/utils/format'

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
.contract-events-table {
  &__transaction {
    white-space: nowrap;
  }

  &__event-data {
    word-wrap: anywhere;
    max-width: 450px;
  }
}
</style>
