<template>
  <div class="token-events-table-condensed">
    <table
      v-for="event in tokenEvents.data"
      :key="event.hash"
      class="token-events-table-condensed__table">
      <tr class="token-events-table-condensed__row">
        <th class="token-events-table-condensed__header">
          Hash
        </th>

        <td class="tokens-event-table__hash">
          <hash-symbol>th</hash-symbol>
          <value-hash-ellipsed
            :hash="event.hash"
            :link-to="`/transactions/${event.hash}`"/>
        </td>
      </tr>
      <tr class="token-events-table-condensed__row">
        <th class="token-events-table-condensed__header">
          Name
        </th>
        <td class="token-events-table-condensed__data">
          NAME
        </td>
      </tr>
      <tr class="token-events-table-condensed__row">
        <th class="token-events-table-condensed__header">
          Date
        </th>
        <td class="token-events-table-condensed__data">
          <datetime-label :datetime="event.created"/>
        </td>
      </tr>
      <tr class="token-events-table-condensed__row">
        <th class="token-events-table-condensed__header">
          Arguments
        </th>
        <td class="token-events-table-condensed__data">
          <copy-chip
            v-if="event.args"
            class="contract-events-table__copy-chip"
            :clipboard-text="event.args"
            :label="formatEllipseHash"/>
        </td>
      </tr>
      <tr class="token-events-table-condensed__row">
        <th class="token-events-table-condensed__header">
          Data
        </th>
        <td class="token-events-table-condensed__data">
          {{ event.data }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'
import { formatEllipseHash } from '@/utils/format'
import CopyChip from '@/components/CopyChip'

export default {
  name: 'TokenEventTableCondensed',
  components: { CopyChip, DatetimeLabel, ValueHashEllipsed },
  props: {
    tokenEvents: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeLineBreaks(str) {
      return str.toString().replaceAll('\n', '')
    },
    formatEllipseHash,
  },
}
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

  &__cell {
    flex-wrap: wrap;
    gap: var(--space-1);
  }
}
</style>
