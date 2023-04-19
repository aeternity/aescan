<template>
  <table>
    <tr>
      <th>Hash</th>
      <th>Name</th>
      <th>Date</th>
      <th>Data</th>
    </tr>
    <tr
      v-for="event in tokenEvents.data"
      :key="event.hash">
      <td class="tokens-event-table__hash">
        <hash-symbol>th</hash-symbol>
        <value-hash-ellipsed
          :hash="event.hash"
          :link-to="`/transactions/${event.hash}`"/>
      </td>
      <td>
        {{ event.name }}
      </td>
      <td>
        <datetime-label :datetime="event.created"/>
      </td>
      <td>
        <token-events-data-cell
          :name="event.name"
          :data="event.data"
          :args="event.args"/>
      </td>
    </tr>
  </table>
</template>

<script setup>
import TokenEventsDataCell from '~/components/TokenEventsDataCell.vue'

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
