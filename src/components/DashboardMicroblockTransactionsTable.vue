<template>
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>
          <time-toggle-button>Created</time-toggle-button>
        </th>
        <th>Type</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash ">
        <td>
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <timestamp-label :timestamp="transaction.created"/>
        </td>
        <td>{{ transaction.type }}</td>
        <td>
          <transaction-cell
            :transaction-data="transaction.data"
            :transaction-type="transaction.type"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  transactions: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
/* Created Age column: dim + slightly smaller */
td:nth-child(2) {
  color: var(--text-dim);
  font-size: 12.5px;
}

/* Type column: slightly smaller */
td:nth-child(3) {
  font-size: 12.5px;
}
</style>
