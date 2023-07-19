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
        Time
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
        <app-link :to="`/micro-blocks/${microblock.hash}`">
          {{ microblock.hash }}
        </app-link>
      </td>
      <td>
        <datetime-label :datetime="microblock.time"/>
      </td>
      <td>
        {{ microblock.transactionsCount }}
      </td>
    </tr>
  </table>
</template>
<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import DatetimeLabel from '@/components/DatetimeLabel'

defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
