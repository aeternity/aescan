<template>
  <div>
    <table
      v-for="(event, index) in contractEvents.data"
      :key="event.callTxHash"
      class="contract-events-table-condensed__table">
      <tbody>
        <tr class="contract-events-table-condensed__row">
          <th class="contract-events-table-condensed__header">
            <hint-tooltip>
              {{ contractsHints.eventsCallTransaction }}
            </hint-tooltip>
            Call Transaction
          </th>
          <td class="contract-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.callTxHash"
              :link-to="`/transactions/${event.callTxHash}`"/>
          </td>
        </tr>
        <tr class="contract-events-table-condensed__row">
          <th class="contract-events-table-condensed__header">
            <hint-tooltip>
              {{ contractsHints.eventsCreated }}
            </hint-tooltip>
            <time-toggle-button class="contract-events-table-condensed__button">
              Created
            </time-toggle-button>
          </th>
          <td class="contract-events-table-condensed__data">
            <block-time-cell
              :height="event.createdHeight"
              :timestamp="event.created"/>
          </td>
        </tr>
        <tr class="contract-events-table-condensed__row">
          <th class="contract-events-table-condensed__header">
            <hint-tooltip>
              {{ contractsHints.eventsName }}
            </hint-tooltip>
            Event Name
          </th>
          <td class="contract-events-table-condensed__data">
            {{ event.eventName ? event.eventName : 'N/A' }}
          </td>
        </tr>
        <tr class="contract-events-table-condensed__row">
          <th
            :class="['contract-events-table-condensed__header',
                     {'contract-events-table-condensed__header--expanded': isExpanded.includes(index)}]">
            <hint-tooltip>
              {{ contractsHints.eventsData }}
            </hint-tooltip>
            Data
          </th>
          <td
            v-if="event.isDecoded"
            class="contract-events-table-condensed__cell">
            <contract-event-cell
              :event="event"
              :contract-details="contractDetails"/>
          </td>
          <td
            v-else
            :class="['contract-events-table-condensed__data',
                     {'contract-events-table-condensed__data--expanded': isExpanded.includes(index)}]">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              {{ isExpanded.includes(index) ? 'Hide arguments' : 'See arguemnts' }}
            </expand-button>
          </td>
        </tr>
        <tr
          v-if="isExpanded.includes(index)"
          class="contract-events-table-condensed__row">
          <td colspan="5">
            <events-panel
              :args="event.args"
              :call-tx-hash="event.callTxHash"
              :log-id="event.logIdx"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'

const props = defineProps({
  contractDetails: {
    type: Object,
    required: true,
  },
  contractEvents: {
    type: Object,
    required: true,
  },
})

const isExpanded = ref([])

watch(() => props.contractEvents, () => {
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
.contract-events-table-condensed {
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

  &__cell {
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
