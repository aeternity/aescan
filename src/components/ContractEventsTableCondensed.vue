<template>
  <div class="contract-events-table-condensed">
    <table
      v-for="(event, index) in contractEvents.data"
      :key="event.callTxHash"
      class="contract-events-table-condensed__table">
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Call Transaction
            <template #tooltip>
              {{ contractsHints.eventsCallTransaction }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <value-hash-ellipsed
            :hash="event.callTxHash"
            :link-to="`/transactions/${event.callTxHash}`"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Created
            <template #tooltip>
              {{ contractsHints.eventsCreated }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          <div>
            <app-link
              :to="`/keyblocks/${event.createdHeight}`">
              {{ event.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="event.created"/>
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th class="contract-events-table-condensed__header">
          <app-tooltip>
            Event Name
            <template #tooltip>
              {{ contractsHints.eventsName }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-events-table-condensed__data">
          {{ event.eventName ? event.eventName : 'N/A' }}
        </td>
      </tr>
      <tr class="contract-events-table-condensed__row">
        <th
          :class="[
            'contract-events-table-condensed__header',
            {'contract-events-table-condensed__header--expanded': isOpened.includes(index)}]">
          <app-tooltip>
            Data
            <template #tooltip>
              {{ contractsHints.eventsData }}
            </template>
          </app-tooltip>
        </th>
        <td
          :class="[
            'contract-events-table-condensed__data',
            {'contract-events-table-condensed__data--expanded': isOpened.includes(index)}]">
          <expand-button
            :is-collapsed="!isOpened.includes(index)"
            @click="toggle(index)">
            {{ isOpened.includes(index) ? 'Hide arguments' : 'See arguemnts' }}
          </expand-button>
        </td>
      </tr>
      <tr
        v-if="isOpened.includes(index)"
        class="contract-events-table-condensed__row">
        <td colspan="5">
          <contract-event-data-panel :event="event"/>
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import ContractEventDataPanel from '@/components/ContractEventDataPanel'
import ExpandButton from '@/components/ExpandButton'

const props = defineProps({
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
}
</style>
