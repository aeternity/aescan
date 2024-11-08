<template>
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
</template>
<script setup>
defineProps({
  miners: {
    type: Array,
    required: true,
  },
})
</script>
