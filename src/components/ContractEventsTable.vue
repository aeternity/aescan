<template>
  <table>
    <tr>
      <th>Call Transaction</th>
      <th>Created</th>
      <th>Event Name</th>
      <th>Arguments</th>
      <th>Data</th>
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

<script>
import DatetimeLabel from '@/components/DatetimeLabel'
import CopyChip from '@/components/CopyChip'
import HashSymbol from '@/components/HashSymbol'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatEllipseHash } from '@/utils/format'

export default {
  name: 'ContractEventsTable',
  components: { DatetimeLabel, CopyChip, HashSymbol, ValueHashEllipsed },
  props: {
    contractEvents: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeLineBreaks(str) {
      return str.toString().replaceAll('\n', '')
    },
    formatEllipseHash,
  },
}
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
