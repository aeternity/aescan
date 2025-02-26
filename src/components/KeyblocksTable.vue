<template>
  <table class="keyblocks-table">
    <thead>
      <tr>
        <th>
          Block
          <hint-tooltip>
            {{ keyblocksHints.keyblockHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ keyblocksHints.time }}
          </hint-tooltip>
        </th>
        <th>
          Transactions Count
          <hint-tooltip>
            {{ keyblocksHints.transactionsCount }}
          </hint-tooltip>
        </th>
        <th>
          Microblocks Count
          <hint-tooltip>
            {{ keyblocksHints.microblockCount }}
          </hint-tooltip>
        </th>
        <th>
          Beneficiary
          <hint-tooltip>
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
        </th>
        <th>
          Reward
          <hint-tooltip>
            {{ keyblocksHints.beneficiaryReward }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="keyblock in keyblocks.data"
        :key="keyblock.height">
        <td class="keyblocks-table__data">
          <value-hash-ellipsed
            :hash="keyblock.hash"
            :link-to="`/keyblocks/${keyblock.hash}`"/>
        </td>
        <td class="keyblocks-table__data">
          <block-time-cell
            :height="keyblock.block"
            :timestamp="keyblock.time"/>
        </td>
        <td class="keyblocks-table__data">
          {{ keyblock.transactionsCount }}
        </td>
        <td class="keyblocks-table__data">
          {{ keyblock.microBlocksCount }}
        </td>
        <td class="keyblocks-table__data">
          <value-hash-ellipsed
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary}`"/>
        </td>
        <td class="keyblocks-table__data">
          <price-label :price="keyblock.beneficiaryReward"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

defineProps({
  keyblocks: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.keyblocks-table__data {
  white-space: nowrap;
}
</style>
