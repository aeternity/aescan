<template>
  <table>
    <thead>
      <tr>
        <th>Query Tx</th>
        <th>Status</th>
        <th>Queried at</th>
        <th>Respond Tx</th>
        <th>Respond at</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(event, index) in oracleEvents.data"
        :key="event.respondTx">
        <tr>
          <td :class="[{'oracle-events-table__opened': isOpened.includes(index)}]">
            <hash-symbol>th</hash-symbol>
            <value-hash-ellipsed
              :hash="event.queryTx"
              :link-to="`/transactions/${event.queryTx}`"/>
          </td>
          <td :class="[{'oracle-events-table__opened': isOpened.includes(index)}]">
            <response-button
              :status="event.status"
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)"/>
          </td>
          <td :class="[{'oracle-events-table__opened': isOpened.includes(index)}]">
            <div>
              {{ event.queriedAtHeight }}
            </div>
            <datetime-label :datetime="event.queriedAtTime"/>
          </td>
          <td :class="[{'oracle-events-table__opened': isOpened.includes(index)}]">
            N/A
          </td>
          <td :class="[{'oracle-events-table__opened': isOpened.includes(index)}]">
            N/A
          </td>
        </tr>
        <tr v-if="isOpened.includes(index)">
          <td
            colspan="5"
            class="oracle-events-table__query">
            <oracle-events-query-panel :event="event"/>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  oracleEvents: {
    type: Array,
    required: true,
  },
})
const isOpened = ref([])

function toggle(id) {
  const index = isOpened.value.indexOf(id)
  if (index > -1) {
    isOpened.value.splice(index, 1)
  } else {
    isOpened.value.push(id)
  }
}
</script>

<style scoped>
.oracle-events-table {
  &__opened {
    border-bottom: 0;
  }

  &__query {
    border-top: 0;
  }
}
</style>
