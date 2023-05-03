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
      v-for="(event, index) in events.data"
      :key="event.respondTx">
      <tr>
        <td :class="[{'oracle-events-table__opened': opened.includes(index)}]">
          <value-hash-ellipsed
            :hash="event.queryTx"
            :link-to="`/transactions/${event.queryTx}`"/>
        </td>
        <td :class="[{'oracle-events-table__opened': opened.includes(index)}]">
          <response-button
            :status="event.status"
            :is-collapsed="!opened.includes(index)"
            @click="toggle(index)"/>
        </td>
        <td :class="[{'oracle-events-table__opened': opened.includes(index)}]">
          <div>
            {{ event.queriedAtHeight }}
          </div>
          <datetime-label :datetime="event.queriedAtTime"/>
        </td>
        <td :class="[{'oracle-events-table__opened': opened.includes(index)}]">
          N/A
        </td>
        <td :class="[{'oracle-events-table__opened': opened.includes(index)}]">
          N/A
        </td>
      </tr>
      <tr v-if="opened.includes(index)">
        <td
          colspan="5"
          class="oracle-events-table__query">
          <OracleEventsQueryPanel
            :event="event"
            :is-response-available="true"/>
        </td>
      </tr>
    </template>
  </table>
</template>

<script setup>
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
.oracle-events-table {
  &__opened {
    border-bottom: 0;
  }

  &__query {
    border-top: 0;
  }
}
</style>
