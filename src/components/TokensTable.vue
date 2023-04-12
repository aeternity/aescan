<template>
  <table class="tokens-table__table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Contract ID</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="token in tokens.data"
        :key="token.contract_id">
        <td>
          <app-link
            :to="`/tokens/${token.contract_id}`"
            class="tokens-table__link">
            <img
              v-if="token.isAe"
              alt="æ token"
              src="@/assets/ae-token.svg"
              class="tokens-table__icon">
            <app-identicon
              v-else
              :id="token.contract_id"
              class="tokens-table__icon"/>
            {{ token.symbol }}
          </app-link>
        </td>
        <td>{{ token.name }}</td>
        <td>
          <value-hash-ellipsed
            :link-to="`/contracts/${token.contract_id}`"
            :hash="token.contract_id "/>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>

import AppIdenticon from '~/components/AppIdenticon.vue'

defineProps({
  tokens: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.tokens-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
