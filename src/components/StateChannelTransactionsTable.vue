<template>
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>
          <time-toggle-button/>
        </th>
        <th>Type</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash">
        <td class="state-channel-transactions-table__data">
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td class="state-channel-transactions-table__data">
          <block-time-cell
            :height="transaction.createdHeight"
            :timestamp="transaction.created"/>
        </td>
        <td class="state-channel-transactions-table__data">
          {{ transaction.type }}
        </td>
        <td class="state-channel-transactions-table__data">
          <transaction-cell
            :transaction-type="transaction.type"
            :transaction-data="transaction.data"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  transactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.state-channel-transactions-table__data {
  white-space: nowrap;
}
</style>
