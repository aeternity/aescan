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
        Created
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
        <td :class="[{'contract-events-table__data--expanded': isOpened.includes(index)}]">
          <value-hash-ellipsed
            :hash="event.callTxHash"
            :link-to="`/transactions/${event.callTxHash}`"/>
        </td>
        <td :class="[{'contract-events-table__data--expanded': isOpened.includes(index)}]">
          <div>
            <app-link
              :to="`/keyblocks/${event.createdHeight}`">
              {{ event.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="event.created"/>
        </td>
        <td :class="[{'contract-events-table__data--expanded': isOpened.includes(index)}]">
          {{ event.eventName ? event.eventName : 'N/A' }}
        </td>
        <td v-if="event.isDecoded">
          <contract-event-cell
            :event="event"
            :contract-details="contractDetails"/>
        </td>
        <td
          v-else
          :class="[{'contract-events-table__data--expanded': isOpened.includes(index)}]">
          <expand-button
            :is-collapsed="!isOpened.includes(index)"
            @click="toggle(index)">
            {{ isOpened.includes(index) ? 'Hide arguments' : 'See arguemnts' }}
          </expand-button>
        </td>
      </tr>
      <tr v-if="isOpened.includes(index)">
        <td
          colspan="4"
          :class="[
            'contract-events-table__arguments',
            {'contract-events-table__arguments--expanded': isOpened.includes(index)}
          ]">
          <contract-event-data-panel :event="event"/>
        </td>
      </tr>
    </template>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import ContractEventDataPanel from '@/components/ContractEventDataPanel'
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

const isOpened = ref([])

watch(() => props.contractEvents, () => {
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
