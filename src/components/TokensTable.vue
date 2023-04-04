<template>
  <table>
    <th>Image</th>
    <th>Name</th>
    <th>Amount</th>
    <th>Hash (contract)</th>
    <th>Symbol</th>
    <tr
      v-for="token in tokens"
      :key="token.contract_id">
      <td>
        <app-identicon :id="token.contract_id"/>
      </td>
      <td>{{ token.name }}</td>
      <td>{{ token.contract_txi }}</td>
      <td>
        <app-link
          :to="`/contracts/${token.contract_id}`">
          {{ token.contract_id }}
        </app-link>
      </td>
      <td>{{ token.symbol }}</td>
    </tr>
  </table>
</template>
<script>

export default {
  name: 'TokensTable',
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
}
</script>
