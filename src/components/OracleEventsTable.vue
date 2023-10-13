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
          Queried At
          <hint-tooltip>
            {{ oraclesHints.queriedAt }}
          </hint-tooltip>
        </th>
        <th>
          Respond Tx
          <hint-tooltip>
            {{ oraclesHints.respondTx }}
          </hint-tooltip>
        </th>
        <th>
          Responded At
          <hint-tooltip>
            {{ oraclesHints.respondedAt }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(event, index) in oracleEvents.data"
        :key="event.respondTx">
        <tr>
          <td :class="[{'oracle-events-table__data--expanded': isExpanded.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.queryTx"
              :link-to="`/transactions/${event.queryTx}`"/>
          </td>
          <td :class="[{'oracle-events-table__data--expanded': isExpanded.includes(index)}]">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              Response available
            </expand-button>
          </td>
          <td :class="[{'oracle-events-table__data--expanded': isExpanded.includes(index)}]">
            <block-time-cell
              :height="event.queriedHeight"
              :datetime="event.queriedAt"/>
          </td>
          <td :class="[{'oracle-events-table__data--expanded': isExpanded.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.respondTx"
              :link-to="`/transactions/${event.respondTx}`"/>
          </td>
          <td :class="[{'oracle-events-table__data--expanded': isExpanded.includes(index)}]">
            <block-time-cell
              :height="event.respondedHeight"
              :datetime="event.respondedAt"/>
          </td>
        </tr>
        <tr v-if="isExpanded.includes(index)">
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

const isExpanded = ref([])

watch(() => props.oracleEvents, () => {
  isExpanded.value = []
})

function toggle(id) {
  const index = isExpanded.value.indexOf(id)
  if (index > -1) {
    isExpanded.value.splice(index, 1)
  } else {
    isExpanded.value.push(id)
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
