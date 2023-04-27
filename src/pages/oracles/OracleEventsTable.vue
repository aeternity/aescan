<template>
  <table>
    <tr>
      <th>Query Tx</th>
      <th>Status</th>
      <th>Queried at</th>
      <th>Respond Tx</th>
      <th>Respond at</th>
    </tr>
    <tr
      v-for="event in events"
      :key="event.respondTx">
      <td>
        <value-hash-ellipsed
          :hash="event.queryTx"
          :link-to="`/transactions/${event.callTxHash}`"/>
      </td>
      <td>{{ event.status }}</td>
      <td>
        <div>
          {{ event.queriedAtHeight }}
        </div>
        <datetime-label :datetime="event.queriedAtTime"/>
      </td>
      <td>
        <value-hash-ellipsed
          :hash="event.respondTx"
          :link-to="`/transactions/${event.respondTx}`"/>
      </td>
      <td>
        <div>
          {{ event.respondedAtHeight }}
        </div>
        <datetime-label :datetime="event.respondedAtTime"/>
      </td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  events: {
    type: Array,
    required: true,
  },
})
</script>
