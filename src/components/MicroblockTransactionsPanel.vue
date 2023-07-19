<template>
  <app-panel v-if="microblockTransactions">
    <!--    todo sanitize-->
    <table>
      <tr>
        <th>Hash</th>
        <th>Time</th>
      </tr>
      <tr v-for="transaction in microblockTransactions.data">
        <td>{{ transaction.hash }}</td>
        <td>{{ transaction.time }}</td>
      </tr>
    </table>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'

const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockTransactions } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const route = useRoute()

if (process.client) {
  await fetchMicroblockTransactions(route.params.id)
  // await fetchMicroblockTransactions({
  //   limit: limit.value,
  //   contractId: route.params.id,
  // })
}
</script>
