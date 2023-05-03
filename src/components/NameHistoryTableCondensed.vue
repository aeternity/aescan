<template>
  <div class="name-history-table-condensed">
    <table
      v-for="action of actions?.data"
      :key="action.hash"
      class="name-history-table-condensed__table">
      <tbody>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            Hash
          </th>
          <td class="name-history-table-condensed__data">
            <value-hash-ellipsed
              :hash="action.hash"
              :link-to="`/transactions/${action.hash}`"/>
          </td>
        </tr>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            Time
          </th>
          <td class="name-history-table-condensed__data">
            <div>
              {{ action.createdHeight }}
            </div>
            <datetime-label :datetime="action.created"/>
          </td>
        </tr>
        <tr class="name-history-table-condensed__row">
          <th class="name-history-table-condensed__header">
            Activity
          </th>
          <td class="name-history-table-condensed__data">
            {{ action.type }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
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
.name-history-table-condensed {
  &__table {
    margin-bottom: var(--space-4);

    &:last-of-type {
      margin-bottom: var(--space-3);
    }

    @media (--desktop) {
      &:last-of-type {
        margin-bottom: var(--space-1);
      }
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
