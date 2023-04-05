<template>
  <div class="tokens-table-condensed">
    <!--      todo check styles-->
    <table
      v-for="token in tokens.data"
      :key="token.contract_id"
      class="tokens-table-condensed__table">
      <tbody>
        <tr class="tokens-table-condensed__row">
          <th class="tokens-table-condensed__header">
            Symbol
          </th>
          <td class="tokens-table-condensed__data">
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
        </tr>

        <tr class="tokens-table-condensed__row">
          <th class="tokens-table-condensed__header">
            Name
          </th>
          <td class="tokens-table-condensed__data">
            {{ token.name }}
          </td>
        </tr>
        <tr class="tokens-table-condensed__row">
          <th class="tokens-table-condensed__header">
            Hash
          </th>
          <td class="tokens-table-condensed__data">
            <app-link
              :to="`/contracts/${token.contract_id}`">
              {{ token.contract_id }}
            </app-link>
          </td>
        </tr>
        <tr class="tokens-table-condensed__row">
          <th class="tokens-table-condensed__header">
            Amount
          </th>
          <td class="tokens-table-condensed__data">
            9999
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TokensTableCondensed',
  props: {
    tokens: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.tokens-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--space-1);
    @media (--desktop) {
      width: 24px;
      height: 24px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
  }
}
</style>
