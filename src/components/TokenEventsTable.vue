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
          <time-toggle-button/>
          <hint-tooltip>
            {{ tokensHints.date }}
          </hint-tooltip>
        </th>
        <th>
          Name
          <hint-tooltip>
            {{ tokensHints.eventName }}
          </hint-tooltip>
        </th>

        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(event, index) in tokenEvents.data"
        :key="event.hash">
        <tr>
          <td
            class="tokens-event-table__hash"
            :class="[{'token-events-table__data--expanded': isExpanded.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.hash"
              :link-to="`/transactions/${event.hash}`"/>
          </td>
          <td :class="[{'token-events-table__data--expanded': isExpanded.includes(index)}]">
            <block-time-cell
              :height="event.createdHeight"
              :timestamp="event.created"/>
          </td>
          <td :class="[{'token-events-table__data--expanded': isExpanded.includes(index)}]">
            {{ event.name }}
          </td>
          <td v-if="event.isDecoded">
            <token-events-data-cell
              :name="event.name"
              :data="event.data"
              :args="event.args"/>
          </td>
          <td
            v-else
            :class="[{'token-events-table__data--expanded': isExpanded.includes(index)}]">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              {{ isExpanded.includes(index) ? 'Hide arguments' : 'See arguments' }}
            </expand-button>
          </td>
        </tr>
        <tr v-if="isExpanded.includes(index)">
          <td
            colspan="4"
            :class="[
              'token-events-table__arguments',
              {'token-events-table__arguments--expanded': isExpanded.includes(index)}
            ]">
            <events-panel :args="event.args"/>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>

import { tokensHints } from '@/utils/hints/tokensHints'
import TokenEventsDataCell from '@/components/TokenEventsDataCell.vue'
import ExpandButton from '@/components/ExpandButton'

const props = defineProps({
  tokenEvents: {
    type: Object,
    required: true,
  },
})

const isExpanded = ref([])

watch(() => props.tokenEvents, () => {
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
.token-events-table {
  &__data--expanded {
    border-bottom: 0;
  }

  &__hash {
    white-space: nowrap;
  }

  &__arguments {
    border-top: 0;

    &--expanded {
      padding-bottom: 0;
    }
  }
}
</style>
