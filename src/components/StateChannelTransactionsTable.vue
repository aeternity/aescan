<template>
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>Time</th>
        <th>Type</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash">
        <td>
          <hash-symbol>th</hash-symbol>

          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <div>
            {{ transaction.createdHeight }}
          </div>
          <datetime-label :datetime="transaction.created"/>
        </td>
        <td>
          {{ transaction.type }}
        </td>
        <td>
          <transaction-cell
            :transaction-type="transaction.type"
            :transaction-data="transaction.data"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import HashSymbol from '@/components/HashSymbol'
import TransactionCell from '@/components/TransactionCell'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactions: {
    type: Object,
    default: null,
  },
})
</script>
