<template>
  <table>
    <tr>
      <th>
        Call transaction
        <hint-tooltip>
          {{ contractsHints.eventsCallTransaction }}
        </hint-tooltip>
      </th>
      <th>
        <time-toggle-button>Created</time-toggle-button>
        <hint-tooltip>
          {{ contractsHints.eventsCreated }}
        </hint-tooltip>
      </th>
      <th>
        Name
        <hint-tooltip>
          {{ contractsHints.eventsName }}
        </hint-tooltip>
      </th>
      <th>
        Data
        <hint-tooltip>
          {{ contractsHints.eventsData }}
        </hint-tooltip>
      </th>
    </tr>
    <template
      v-for="(event, index) in contractEvents.data"
      :key="event.callTxHash">
      <tr>
        <td :class="[{'contract-events-table__data--expanded': isExpanded.includes(index)}]">
          <value-hash-ellipsed
            :hash="event.callTxHash"
            :link-to="`/transactions/${event.callTxHash}`"/>
        </td>
        <td :class="[{'contract-events-table__data--expanded': isExpanded.includes(index)}]">
          <block-time-cell
            :height="event.createdHeight"
            :timestamp="event.created"/>
        </td>
        <td :class="[{'contract-events-table__data--expanded': isExpanded.includes(index)}]">
          {{ event.eventName || 'N/A' }}
        </td>
        <td v-if="event.isDecoded">
          <contract-event-cell
            :event="event"
            :contract-details="contractDetails"/>
        </td>
        <td
          v-else
          :class="[{'contract-events-table__data--expanded': isExpanded.includes(index)}]">
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
            'contract-events-table__arguments',
            {'contract-events-table__arguments--expanded': isExpanded.includes(index)}
          ]">
          <events-panel
            :args="event.args"
            :call-tx-hash="event.callTxHash"
            :log-id="event.logIdx"/>
        </td>
      </tr>
    </template>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import ExpandButton from '@/components/ExpandButton'
import ContractEventCell from '@/components/ContractEventCell'

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
.contract-events-table {
  &__data--expanded {
    border-bottom: 0;
  }

  &__event-data {
    word-wrap: anywhere;
    max-width: 450px;
  }

  &__arguments {
    border-top: 0;

    &--expanded {
      padding-bottom: 0;
    }
  }
}
</style>
