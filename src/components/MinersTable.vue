<template>
  <table>
    <thead>
      <tr>
        <th>
          Miner
          <hint-tooltip>
            {{ miningHints.minerAccount }}
          </hint-tooltip>
        </th>
        <th>
          Total Reward
          <hint-tooltip>
            {{ miningHints.minerTotalReward }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="miner in miners.data"
        :key="miner.miner">
        <td>
          <value-hash-ellipsed
            :link-to="`/accounts/${miner.miner}`"
            :hash="miner.miner"/>
        </td>
        <td>
          <price-label :price="miner.totalReward"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { miningHints } from '@/utils/hints/miningHints'

defineProps({
  miners: {
    type: Array,
    required: true,
  },
})
</script>
