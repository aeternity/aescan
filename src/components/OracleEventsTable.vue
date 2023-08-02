<template>
  <table>
    <thead>
      <tr>
        <th>
          Query Tx
          <hint-tooltip>
            {{ oraclesHints.queryTx }}
          </hint-tooltip>
        </th>
        <th>
          Status
          <hint-tooltip>
            {{ oraclesHints.queryStatus }}
          </hint-tooltip>
        </th>
        <th>
          Respond Tx
          <hint-tooltip>
            {{ oraclesHints.respondTx }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(event, index) in oracleEvents.data"
        :key="event.respondTx">
        <tr>
          <td :class="[{'oracle-events-table__data--expanded': isOpened.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.queryTx"
              :link-to="`/transactions/${event.queryTx}`"/>
          </td>
          <td :class="[{'oracle-events-table__data--expanded': isOpened.includes(index)}]">
            <response-button
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)"/>
          </td>

          <td :class="[{'oracle-events-table__data--expanded': isOpened.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.respondTx"
              :link-to="`/transactions/${event.respondTx}`"/>
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
import { oraclesHints } from '@/utils/hints/oraclesHints'
import HintTooltip from '@/components/HintTooltip'

const props = defineProps({
  oracleEvents: {
    type: Object,
    required: true,
  },
})

const isOpened = ref([])

watch(() => props.oracleEvents, () => {
  isOpened.value = []
})

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
  &__data--expanded {
    border-bottom: 0;
  }

  &__query {
    border-top: 0;
  }
}
</style>
