<template>
  <table>
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ tokensHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          Name
          <hint-tooltip>
            {{ tokensHints.eventName }}
          </hint-tooltip>
        </th>
        <th>
          Date
          <hint-tooltip>
            {{ tokensHints.date }}
          </hint-tooltip>
        </th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="event in tokenEvents.data"
        :key="event.hash">
        <td class="tokens-event-table__hash">
          <value-hash-ellipsed
            :hash="event.hash"
            :link-to="`/transactions/${event.hash}`"/>
        </td>
        <td>
          {{ event.name }}
        </td>
        <td>
          <div>
            <app-link
              :to="`/keyblocks/${event.createdHeight}`">
              {{ event.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="event.created"/>
        </td>
        <td>
          <token-events-data-cell
            :name="event.name"
            :data="event.data"
            :args="event.args"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import { tokensHints } from '@/utils/hints/tokensHints'
import TokenEventsDataCell from '@/components/TokenEventsDataCell.vue'

defineProps({
  tokenEvents: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.token-events-table {
  &__hash {
    white-space: nowrap;
  }

  &__args {
    word-wrap: anywhere;
    max-width: 450px;
  }
}
</style>
