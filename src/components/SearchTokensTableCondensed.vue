<template>
  <div>
    <table
      v-for="token in tokensFound.data"
      :key="token.contractId"
      class="search-tokens-table-condensed__table">
      <tbody>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Symbol
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            <app-link :to="`/tokens/${token.contractId}`">
              <token-symbol-icon
                :contract-id="token.contractId"/>
              {{ token.symbol }}
            </app-link>
          </td>
        </tr>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Name
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            {{ token.name }}
          </td>
        </tr>
        <tr class="search-tokens-table-condensed__row">
          <th class="search-tokens-table-condensed__header">
            <app-tooltip>
              Smart Contract
            </app-tooltip>
          </th>
          <td class="search-tokens-table-condensed__data">
            {{ token.contractId }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

import AppLink from '~/components/AppLink'
import AppTooltip from '~/components/AppTooltip'

defineProps({
  tokensFound: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>
.search-tokens-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
