<template>
  <table>
    <tr>
      <th>
        Hash
        <hint-tooltip>
          {{ keyblocksHints.microblockHash }}
        </hint-tooltip>
      </th>
      <th>
        <time-switch-button/>
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
    </tr>
    <tr
      v-for="microblock in microblocks.data"
      :key="microblock.hash">
      <td>
        <value-hash-ellipsed
          :link-to="`/microblocks/${microblock.hash}`"
          :hash="microblock.hash"/>
      </td>
      <td>
        <timestamp-label :timestamp="microblock.time"/>
      </td>
      <td>
        {{ microblock.transactionsCount }}
      </td>
    </tr>
  </table>
</template>
<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
