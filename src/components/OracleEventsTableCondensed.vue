<template>
  <div class="oracle-events-table-condensed">
    <table
      v-for="(event, index) in oracleEvents.data"
      :key="event.respondTx"
      class="oracle-events-table-condensed__table">
      <tbody>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            Query Tx
          </th>
          <td class="oracle-events-table-condensed__data">
            <value-hash-ellipsed
              :hash="event.queryTx"
              :link-to="`/transactions/${event.queryTx}`"/>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th class="oracle-events-table-condensed__header">
            Status
          </th>
          <td class="oracle-events-table-condensed__data">
            <response-button
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)"/>
          </td>
        </tr>
        <tr class="oracle-events-table-condensed__row">
          <th
            :class="[
              'oracle-events-table-condensed__header',
              {'oracle-events-table-condensed__header--opened': isOpened.includes(index)}]">
            Respond Tx
          </th>
          <td
            :class="[
              'oracle-events-table-condensed__data',
              {'oracle-events-table-condensed__data--opened': isOpened.includes(index)}]">
            <value-hash-ellipsed
              :hash="event.respondTx"
              :link-to="`/transactions/${event.respondTx}`"/>
          </td>
        </tr>
        <tr
          v-if="isOpened.includes(index)"
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
defineProps({
  oracleEvents: {
    type: Object,
    required: true,
  },
})
const isOpened = ref([])

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
.oracle-events-table-condensed {
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

    &--opened {
      border-bottom: 0;
    }
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;

    &--opened {
      border-bottom: 0;
    }
  }
}
</style>
