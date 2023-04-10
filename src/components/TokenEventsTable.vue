<template>
  <table v-if="events">
    <tr>
      <th>Hash</th>
      <th>Name</th>
      <th>Dates</th>
      <th>Arguments</th>
      <th>Data</th>
    </tr>
    <tr
      v-for="event in events.data"
      :key="event.hash">
      <td class="tokens-event-table__hash">
        <hash-symbol>th</hash-symbol>
        <value-hash-ellipsed
          :hash="event.hash"
          :link-to="`/transactions/${event.hash}`"/>
      </td>
      <td>
        NAME
      </td>
      <td>
        <datetime-label :datetime="event.created"/>
      </td>
      <td>
        <copy-chip
          v-if="event.args"
          class="contract-events-table__copy-chip"
          :clipboard-text="event.args"
          :label="formatEllipseHash"/>
      </td>
      <td class="token-events-table__event-data">
        {{ event.data }}
      </td>
    </tr>
  </table>
</template>
<script>
import { formatEllipseHash } from '~/utils/format'

export default {
  name: 'TokenEventsTable',
  props: {
    events: {
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
.token-events-panel {
  &__hash {
    white-space: nowrap;
  }

  &__time {
    white-space: nowrap;
  }

  &__event-data {
    word-wrap: anywhere;
    max-width: 450px;
  }
}

</style>
