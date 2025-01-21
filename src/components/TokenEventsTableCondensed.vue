<template>
  <div>
    <table
      v-for="(event, index) in tokenEvents.data"
      :key="event.hash"
      class="token-events-table-condensed__table">
      <tbody>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <hint-tooltip>
              {{ tokensHints.hash }}
            </hint-tooltip>
            Hash
          </th>
          <td class="token-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.hash"
              :link-to="`/transactions/${event.hash}`"/>
          </td>
        </tr>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <hint-tooltip>
              {{ tokenEvents.eventName }}
            </hint-tooltip>
            Name
          </th>
          <td class="token-events-table-condensed__data">
            {{ event.name }}
          </td>
        </tr>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <hint-tooltip>
              {{ tokenEvents.date }}
            </hint-tooltip>
            <time-toggle-button class="token-events-table-condensed__button"/>
          </th>
          <td class="token-events-table-condensed__data">
            <block-time-cell
              :height="event.createdHeight"
              :timestamp="event.created"/>
          </td>
        </tr>

        <tr class="token-events-table-condensed__row">
          <th
            :class="[
              'token-events-table-condensed__header',
              {'token-events-table-condensed__header--expanded': isExpanded.includes(index)}]">
            Data
          </th>
          <td
            v-if="event.isDecoded"
            class="token-events-table-condensed__data">
            <token-events-data-cell
              :name="event.name"
              :data="event.data"
              :args="event.args"/>
          </td>
          <td
            v-else
            :class="[
              'token-events-table-condensed__data',
              {'token-events-table-condensed__data--expanded': isExpanded.includes(index)}]">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              {{ isExpanded.includes(index) ? 'Hide arguments' : 'See arguments' }}
            </expand-button>
          </td>
        </tr>
        <tr
          v-if="isExpanded.includes(index)"
          class="token-events-table-condensed__row">
          <td colspan="5">
            <events-panel :args="event.args"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { tokensHints } from '@/utils/hints/tokensHints'

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
.token-events-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);

    &--expanded {
      border-bottom: 0;
    }
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;

    &--expanded {
      border-bottom: 0;
    }
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
