<template>
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>Created</th>
        <th>Type</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash ">
        <td>
          <hash-symbol>
            th
          </hash-symbol>
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <datetime-label :datetime="transaction.created"/>
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
import HashSymbol from '@/components/HashSymbol'
import DatetimeLabel from '@/components/DatetimeLabel'
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactions: {
    required: true,
    type: Object,
  },
})
</script>
