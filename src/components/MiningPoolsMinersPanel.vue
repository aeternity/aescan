<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>Miner</td>
          <td>Total Reward</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="miner in miners.data">
          <td>{{ miner.miner }}</td>
          <td>{{ miner.totalReward }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useMinersStore } from '~/stores/miners'
const { fetchMiners } = useMinersStore()
const { miners } = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMiners()
}
</script>
