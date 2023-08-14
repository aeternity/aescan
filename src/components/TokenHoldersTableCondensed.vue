<template>
  <div class="token-holders-table-condensed">
    <table
      v-for="holder in tokenHolders.data"
      :key="holder.address"
      class="token-holders-table-condensed__table">
      <tr class="token-holders-table-condensed__row">
        <th class="token-holders-table-condensed__header">
          <app-tooltip>
            Account
            <template #tooltip>
              {{ tokensHints.account }}
            </template>
          </app-tooltip>
        </th>
        <td class="token-holders-table-condensed__data">
          <value-hash-ellipsed
            :hash="holder.address"
            :link-to="`/accounts/${holder.address}`"/>
        </td>
      </tr>
      <tr class="token-holders-table-condensed__row">
        <th class="token-holders-table-condensed__header">
          <app-tooltip>
            Amount
            <template #tooltip>
              {{ tokensHints.amount }}
            </template>
          </app-tooltip>
        </th>
        <td class="token-holders-table-condensed__data">
          {{ formatNumber(holder.amount, 0, tokenDetails.decimals) }} {{ tokenDetails.symbol }}
        </td>
      </tr>
      <tr class="token-holders-table-condensed__row">
        <th class="token-holders-table-condensed__header">
          <app-tooltip>
            Percentage
            <template #tooltip>
              {{ tokensHints.percentage }}
            </template>
          </app-tooltip>
        </th>
        <td class="token-holders-table-condensed__data">
          <template v-if="Math.abs(holder.percentage) >= 0.00001">
            {{ formatNumber(Math.abs(holder.percentage)) }}
          </template>
          <template v-else>
            ~0
          </template>
          %
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { formatNumber } from '@/utils/format'
import { tokensHints } from '@/utils/hints/tokensHints'

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

<style scoped>
.token-holders-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    vertical-align: top;
    border-bottom: 1.5px solid var(--color-midnight-25);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
