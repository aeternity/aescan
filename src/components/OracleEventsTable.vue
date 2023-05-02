<template>
  <table>
    <tr>
      <th>Query Tx</th>
      <th>Status</th>
      <th>Queried at</th>
      <th>Respond Tx</th>
      <th>Respond at</th>
    </tr>
    <template
      v-for="(event, index) in events"
      :key="event.respondTx">
      <tr>
        <td>
          <value-hash-ellipsed
            :hash="event.queryTx"
            :link-to="`/transactions/${event.queryTx}`"/>
        </td>
        <td>
          <response-button
            :status="event.status"
            :is-collapsed="!opened.includes(index)"
            @click="toggle(index)"/>
        </td>
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
      <tr v-if="opened.includes(index)">
        <td colspan="5">
          <OracleEventsQueryPanel :event="event"/>
        </td>
      </tr>
    </template>
  </table>
</template>

<script setup>

import OracleEventsQueryPanel from '~/components/OracleEventsQueryPanel'
import ResponseButton from '~/components/ResponseButton'

defineProps({
  events: {
    type: Array,
    required: true,
  },
})
const opened = ref([])

function toggle(id) {
  const index = opened.value.indexOf(id)
  if (index > -1) {
    this.opened.splice(index, 1)
  } else {
    this.opened.push(id)
  }
}
</script>

<style>
dl {
  display: grid;
  grid-template-columns: max-content auto;
}

dt {
  grid-column-start: 1;
}

dd {
  grid-column-start: 2;
}
</style>
