<template>
  <table>
    <tr>
      <th>Hash</th>
      <th>Time</th>
    </tr>
    <tr v-for="transaction in microblockTransactions.data">
      <td>{{ transaction.hash }}</td>
      <td>{{ transaction.time }}</td>
    </tr>
  </table>
</template>
<script setup>
defineProps({
  microblockTransactions: {
    type: Object,
    required: true,
  },
})
</script>
