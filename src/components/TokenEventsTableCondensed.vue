<template>
  <div class="token-events-table-condensed">
    <table
      v-for="event in tokenEvents.data"
      :key="event.hash"
      class="token-events-table-condensed__table">
      <tbody>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ tokensHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="token-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.hash"
              :link-to="`/transactions/${event.hash}`"/>
          </td>
        </tr>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ tokensHints.eventName }}
              </template>
            </app-tooltip>
          </th>
          <td class="token-events-table-condensed__data">
            {{ event.name }}
          </td>
        </tr>
        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            <app-tooltip>
              Date
              <template #tooltip>
                {{ tokensHints.date }}
              </template>
            </app-tooltip>
          </th>
          <td class="token-events-table-condensed__data">
            <div>
              {{ event.createdHeight }}
            </div>
            <datetime-label :datetime="event.created"/>
          </td>
        </tr>

        <tr class="token-events-table-condensed__row">
          <th class="token-events-table-condensed__header">
            Data
          </th>
          <td class="token-events-table-condensed__data">
            <token-events-data-cell
              :name="event.name"
              :data="event.data"
              :args="event.args"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import TokenEventsDataCell from '@/components/TokenEventsDataCell.vue'
import { tokensHints } from '@/utils/hints/tokensHints'

defineProps({
  tokenEvents: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.token-events-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    vertical-align: top;
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
