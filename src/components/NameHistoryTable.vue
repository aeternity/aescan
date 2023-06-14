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
        </td>
        <td>
          <div>
            {{ action.createdHeight }}
          </div>
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

<script setup>
import HashSymbol from '@/components/HashSymbol'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

defineProps({
  actions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.name-history-table {
  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }
}
</style>
