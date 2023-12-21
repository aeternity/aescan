<template>
  <app-panel>
    <table>
      <tr>
        <th>Rank</th>
        <th>Account</th>
        <th>Balance</th>
      </tr>
      <tr
        v-for="(account, index) in topAccounts"
        :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <app-link
            :to="`/accounts/${account.account}`">
            {{ account.account }}
          </app-link>
        </td>
        <td>{{ account.balance }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { useTopAccountsStore } from '~/stores/topAccounts'

const topAccountsStore = useTopAccountsStore()
const { topAccounts } = storeToRefs(topAccountsStore)
const { fetchTopAccounts } = useTopAccountsStore()

await useAsyncData(async() => {
  await fetchTopAccounts()
  return true
})
</script>
