<template>
  <table class="top-accounts-table">
    <tr>
      <th>
        Rank
        <hint-tooltip>
          {{ topAccountsHints.rank }}
        </hint-tooltip>
      </th>
      <th>
        Account
        <hint-tooltip>
          {{ topAccountsHints.account }}
        </hint-tooltip>
      </th>
      <th>
        Balance
        <hint-tooltip>
          {{ topAccountsHints.balance }}
        </hint-tooltip>
      </th>
      <th>
        % Of Circulating
        <hint-tooltip>
          {{ topAccountsHints.percentage }}
        </hint-tooltip>
      </th>
    </tr>
    <tr
      v-for="account in topAccounts"
      :key="account.account">
      <td>{{ account.rank }}.</td>

      <td>
        <app-link
          :to="`/accounts/${account.account}`">
          {{ account.account }}
        </app-link>
      </td>
      <td>
        <price-label :price=" account.balance "/>
      </td>

      <td>{{ account.percentage }} %</td>
    </tr>
  </table>
</template>
<script setup>
import { topAccountsHints } from '@/utils/hints/topAccountsHints'

defineProps({
  topAccounts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.top-accounts-table {
  margin-bottom: var(--space-4);
}
</style>
