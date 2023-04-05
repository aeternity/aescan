<template>
  <table class="tokens-table__table">
    <th>Symbol</th>
    <th>Name</th>
    <th>Hash</th>
    <th>Amount</th>
    <tr
      v-for="token in tokens.data"
      :key="token.contract_id">
      <td>
        <div class="tokens-table__container">
          <app-identicon
            :id="token.contract_id"
            class="tokens-table__identicon"/>
          {{ token.symbol }}
        </div>
      </td>
      <td>{{ token.name }}</td>
      <td>
        <app-link
          :to="`/contracts/${token.contract_id}`">
          {{ token.contract_id }}
        </app-link>
      </td>
      <td>99999</td>
    </tr>
  </table>
</template>
<script>

export default {
  name: 'TokensTable',
  props: {
    tokens: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.tokens-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__identicon {
    margin-right: var(--space-1);
  }

  &__container {
    display: flex;
    align-items: center;
  }
}
</style>
