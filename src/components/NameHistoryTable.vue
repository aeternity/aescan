<template>
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>Time</th>
        <th>Activity</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="action in actions?.data"
        :key="action.hash">
        <td>
          <hash-symbol>th</hash-symbol>

          <value-hash-ellipsed
            :hash="action.hash"
            :link-to="`/transactions/${action.hash}`"/>

          <div class="name-history-table__blocks-ago">
            {{ formatBlocksRelative(action.createdHeightDiff) }}
          </div>
        </td>
        <td>
          <datetime-label :datetime="action.created"/>
        </td>
        <td>
          <div>
            {{ action.type }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import HashSymbol from '@/components/HashSymbol'
import { formatBlocksRelative } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'NameHistoryTable',
  components: { ValueHashEllipsed, DatetimeLabel, HashSymbol },
  props: {
    actions: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatBlocksRelative,
  },
}
</script>

<style scoped>
.name-history-table {
  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }

  &__blocks-ago {
    margin-left: var(--space-5);
  }
}
</style>
