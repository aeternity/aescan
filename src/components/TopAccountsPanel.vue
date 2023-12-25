<template>
  <app-panel>
    <table>
      <tr>
        <th>Rank</th>
        <th>Account</th>
        <th>% Of Circulating</th>
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
        <td>{{ account.percentage }} %</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { useTopAccountsStore } from '~/stores/topAccounts'
import { useBlockchainStatsStore } from '~/stores/blockchainStats'

const topAccountsStore = useTopAccountsStore()
const { topAccounts, distribution } = storeToRefs(topAccountsStore)
const { fetchTopAccounts } = useTopAccountsStore()
const { fetchTotalStats } = useBlockchainStatsStore()

await useAsyncData(async() => {
  await fetchTopAccounts()
  await fetchTotalStats()
  return true
})
</script>
