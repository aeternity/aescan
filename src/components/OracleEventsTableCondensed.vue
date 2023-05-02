<template>
  <div class="oracle-events-table-condensed">
    {{ events }}
    <table
      v-for="event in events.data"
      :key="event.respondTx"
      class="oracle-events-table-condensed__table">
      <tr class="oracle-events-table-condensed__row">
        <th class="oracle-events-table-condensed__header">
          Query Tx
        </th>
        <td class="oracle-events-table-condensed__data">
          <value-hash-ellipsed
            :hash="event.queryTx"
            :link-to="`/transactions/${event.callTxHash}`"/>
        </td>
      </tr>
      <tr class="oracle-events-table-condensed__row">
        <th class="oracle-events-table-condensed__header">
          Status
        </th>
        <td class="oracle-events-table-condensed__data">
          <response-button
            :status="event.status"
            :is-collapsed="!opened.includes(index)"
            @click="toggle(index)"/>
        </td>
      </tr>
      <tr class="oracle-events-table-condensed__row">
        <th class="oracle-events-table-condensed__header">
          Queried at
        </th>
        <td class="oracle-events-table-condensed__data">
          <div>
            {{ event.queriedAtHeight }}
          </div>
          <datetime-label :datetime="event.queriedAtTime"/>
        </td>
      </tr>
      <tr class="oracle-events-table-condensed__row">
        <th class="oracle-events-table-condensed__header">
          Respond Tx
        </th>
        <td class="oracle-events-table-condensed__data">
          <value-hash-ellipsed
            :hash="event.respondTx"
            :link-to="`/transactions/${event.respondTx}`"/>
        </td>
      </tr>
      <tr class="oracle-events-table-condensed__row">
        <th class="oracle-events-table-condensed__header">
          Respond at
        </th>
        <td class="oracle-events-table-condensed__data">
          <div>
            {{ event.respondedAtHeight }}
          </div>
          <datetime-label :datetime="event.respondedAtTime"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
// todo unite prop name
defineProps({
  events: {
    type: Array,
    required: true,
  },
})
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
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
<!--todo check unused classes-->
