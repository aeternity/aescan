<template>
  <table class="search-tokens-table">
    <tr>
      <th>Symbol</th>
      <th>Name</th>
      <th>Smart Contract</th>
    </tr>
    <tr
      v-for="token in tokens.data"
      :key="token.contractId">
      <td>
        <app-link
          :to="`/tokens/${token.contractId}`"
          class="search-tokens-table__link">
          <token-symbol-icon
            class="search-tokens-table__icon"
            :contract-id="token.contractId"/>
          {{ token.symbol }}
        </app-link>
      </td>
      <td>{{ token.name }}</td>
      <td>
        <value-hash-ellipsed
          :link-to="`/contracts/${token.contractId}`"
          :hash="token.contractId "/>
      </td>
    </tr>
  </table>
</template>

<script setup>

defineProps({
  tokens: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>
.search-tokens-table {
  margin-bottom: var(--space-4);
  /*todo move up*/

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }
}
</style>
