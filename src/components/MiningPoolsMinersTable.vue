<template>
  <table>
    <thead>
      <tr>
        <th>Miner
          <hint-tooltip>
            {{ miningHints.mining }}
          </hint-tooltip>
        </th>
        <th>Total Reward
          <hint-tooltip>
            {{ miningHints.mining }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="miner in miners.data"
        :key="miner.name">
        <td>{{ miner.miner }}</td>
        <td>{{ miner.totalReward }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { miningHints } from "../utils/hints/miningHints";

defineProps({
  miners: {
    type: Array,
    required: true,
  },
})
</script>
