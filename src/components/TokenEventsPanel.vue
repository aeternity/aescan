<template>
  <app-panel>
    <table v-if="tokenEvents">
      <tr>
        <th>Hash</th>
        <th>Name</th>
        <th>Dates</th>
        <th>Arguments</th>
        <th>Data</th>
      </tr>
      <tr
        v-for="event in tokenEvents.data"
        :key="event.hash">
        <td class="tokens-event-panel__hash">
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
            class="contract-events-panel__copy-chip"
            :clipboard-text="event.args"
            :label="formatEllipseHash(event.args)"/>
        </td>
        <td class="token-events-table__event-data">
          {{ event.data }}
        </td>
      </tr>
    </table>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import { useTokenDetailsStore } from '~/stores/tokenDetails'
import { formatEllipseHash } from '~/utils/format'

export default {
  name: 'TokenEventsPanel',
  computed: {
    ...mapState(useTokenDetailsStore, ['tokenEvents']),
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
.token-events-table {
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
