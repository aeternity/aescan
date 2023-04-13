<template>
  <table class="contract-call-transactions-table">
    <thead>
      <tr>
        <th>Hash</th>
        <th>Time</th>
        <th>Caller</th>
        <th>Entry point</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in contractCallTransactions.data"
        :key="transaction.hash">
        <td class="contract-call-transactions-table__column">
          <hash-symbol>th</hash-symbol>

          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td class="contract-call-transactions-table__column">
          <div>
            {{ transaction.createdHeight }}
          </div>
          <datetime-label :datetime="transaction.created"/>
        </td>
        <td class="contract-call-transactions-table__column">
          <value-hash-ellipsed
            :hash="transaction.data.caller_id"
            :link-to="`/accounts/${transaction.data.caller_id}`"/>
        </td>
        <td>
          <app-chip size="sm">
            {{ transaction.data.function }}
          </app-chip>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import HashSymbol from '@/components/HashSymbol'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'

defineProps({
  contractCallTransactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.contract-call-transactions-table {
  &__column {
    width: 180px;
  }
}
</style>
