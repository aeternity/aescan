<template>
  <table>
    <thead>
      <tr>
        <th>Account</th>
        <th>Amount</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="holder in tokenHolders.data"
        :key="holder.address">
        <td>
          <value-hash-ellipsed
            :hash="holder.address"
            :link-to="`/accounts/${holder.address}`"/>
        </td>
        <td>
          {{ formatNumber(holder.amount) }} {{ tokenDetails.symbol }}
        </td>
        <td>
          <template v-if="holder.percentage >= 0.00001">
            {{ formatNumber(holder.percentage) }}
          </template>
          <template v-else>
            ~0
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  tokenHolders: {
    type: Object,
    required: true,
  },
  tokenDetails: {
    type: Object,
    required: true,
  },
})
</script>
