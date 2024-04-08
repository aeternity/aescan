<template>
  <app-swiper :slides="transactions.data">
    <template #slide="{ slideData: transaction }">
      <table>
        <tbody>
          <tr>
            <th class="transactions-swiper__header">
              Hash
            </th>
            <td class="transactions-swiper__data">
              <value-hash-ellipsed
                :hash="transaction.hash"
                :link-to="`/transactions/${transaction.hash }`"/>
            </td>
          </tr>
          <tr>
            <th class="transactions-swiper__header">
              <time-switch-button>Created</time-switch-button>
            </th>
            <td class="transactions-swiper__data">
              <datetime-label :datetime="transaction.created"/>
            </td>
          </tr>
          <tr>
            <th class="transactions-swiper__header">
              Type
            </th>
            <td class="transactions-swiper__data">
              {{ transaction.type }}
            </td>
          </tr>
          <tr>
            <th>Data</th>
            <td>
              <transaction-cell
                :transaction-data="transaction.data"
                :transaction-type="transaction.type"/>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>

<script setup>
import DatetimeLabel from '@/components/DatetimeLabel'
import TransactionCell from '@/components/TransactionCell'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactions: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transactions-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: right;
  }
}
</style>
