<template>
  <table>
    <tr>
      <th>Hash</th>
      <th>Time</th>
    </tr>
    <tr
      v-for="transaction in transactions.data"
      :key="transaction.has">
      <td>
        <app-link
          :to="`/transactions/${transaction.hash}`">
          {{ transaction.hash }}
        </app-link>
      </td>
      <td>
        <datetime-label :datetime="transaction.time"/>
      </td>
    </tr>
  </table>
</template>
<script setup>
defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>
