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
      <template
        v-for="(event, index) in tokenEvents.data"
        :key="event.hash">
        <tr>
          <td
            class="tokens-event-table__hash"
            :class="[{'token-events-table__data--expanded': isOpened.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.hash"
              :link-to="`/transactions/${event.hash}`"/>
          </td>
          <td :class="[{'token-events-table__data--expanded': isOpened.includes(index)}]">
            {{ event.name }}
          </td>
          <td :class="[{'token-events-table__data--expanded': isOpened.includes(index)}]">
            <div>
              <app-link
                :to="`/keyblocks/${event.createdHeight}`">
                {{ event.createdHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="event.created"/>
          </td>
          <td v-if="event.isDecoded">
            <token-events-data-cell
              :name="event.name"
              :data="event.data"
              :args="event.args"/>
          </td>
          <td
            v-else
            :class="[{'token-events-table__data--expanded': isOpened.includes(index)}]">
            <expand-button
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)">
              {{ isOpened.includes(index) ? 'Hide arguments' : 'See arguments' }}
            </expand-button>
          </td>
        </tr>
        <tr v-if="isOpened.includes(index)">
          <td
            colspan="4"
            :class="[
              'token-events-table__arguments',
              {'token-events-table__arguments--expanded': isOpened.includes(index)}
            ]">
            <event-data-panel :args="event.args"/>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>

import { tokensHints } from '@/utils/hints/tokensHints'
import TokenEventsDataCell from '@/components/TokenEventsDataCell.vue'
import EventDataPanel from '~/components/EventDataPanel'
import ExpandButton from '~/components/ExpandButton'

const props = defineProps({
  tokenEvents: {
    type: Object,
    required: true,
  },
})

const isOpened = ref([])

watch(() => props.tokenEvents, () => {
  isOpened.value = []
})

function toggle(id) {
  const index = isOpened.value.indexOf(id)
  if (index > -1) {
    isOpened.value.splice(index, 1)
  } else {
    // todo rename
    isOpened.value.push(id)
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

  /*todo rename*/

  &__args {
    word-wrap: anywhere;
    max-width: 450px;
  }
}
</style>
