<template>
  <div class="top-accounts-table__container">
    <table class="top-accounts-table">
      <thead>
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
      </thead>
      <tbody>
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
      </tbody>
    </table>
  </div>
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

  &__container {
    overflow-x: auto;
  }
}
</style>
