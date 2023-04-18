<template>
  <table>
    <tr>
      <th>Hash</th>
      <th>Name</th>
      <th>Date</th>
      <th>Arguments</th>
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
      <td class="token-events-table__args">
        {{ event.args }}
      </td>
      <td>
        {{ event.data }}
      </td>
    </tr>
  </table>
</template>

<script setup>
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
