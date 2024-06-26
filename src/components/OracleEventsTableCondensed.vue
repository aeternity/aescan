<template>
  <div>
    <table
      v-for="(event, index) in oracleEvents.data"
      :key="event.respondTx"
      class="oracle-events-table-condensed__table">
      <tbody>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            <app-tooltip>
              Query Tx
              <template #tooltip>
                {{ oraclesHints.queryTx }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracle-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.queryTx"
              :link-to="`/transactions/${event.queryTx}`"/>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            <app-tooltip>
              Status
              <template #tooltip>
                {{ oraclesHints.queryStatus }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracle-events-table-condensed__data">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              Response available
            </expand-button>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            <app-tooltip>
              <time-toggle-button>Queried At</time-toggle-button>
              <template #tooltip>
                {{ oraclesHints.queriedAt }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracle-events-table-condensed__data">
            <block-time-cell
              :height="event.queriedHeight"
              :timestamp="event.queriedAt"/>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            <app-tooltip>
              Respond Tx
              <template #tooltip>
                {{ oraclesHints.respondTx }}
              </template>
            </app-tooltip>
          </th>
          <td class="oracle-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.respondTx"
              :link-to="`/transactions/${event.respondTx}`"/>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th
            :class="[
              'oracle-events-table-condensed__header',
              {'oracle-events-table-condensed__header--expanded': isExpanded.includes(index)}]">
            <app-tooltip>
              <time-toggle-button>Responded At</time-toggle-button>
              <template #tooltip>
                {{ oraclesHints.queriedAt }}
              </template>
            </app-tooltip>
          </th>
          <td
            :class="[
              'oracle-events-table-condensed__data',
              {'oracle-events-table-condensed__data--expanded': isExpanded.includes(index)}]">
            <block-time-cell
              :height="event.respondedHeight"
              :timestamp="event.respondedAt"/>
          </td>
        </tr>
        <tr
          v-if="isExpanded.includes(index)"
          class="oracle-events-table-condensed__row">
          <td colspan="5">
            <oracle-events-query-panel :event="event"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppTooltip from '@/components/AppTooltip.vue'
import { oraclesHints } from '@/utils/hints/oraclesHints'

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
.oracle-events-table-condensed {
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

  &__data {
    text-align: right;

    &--expanded {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }
}
</style>
