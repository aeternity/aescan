<template>
  <app-panel>
    <template #heading>
      KEYBLOCK
      <hint-tooltip>
        {{ keyblocksHints.keyblock }}
      </hint-tooltip>
    </template>
    <table>
      <tr>
        <td>
          <app-link :to="`/keyblocks/${keyblockResults.height}`">
            {{ keyblockResults.height }}
          </app-link>
        </td>
        <td>
          <app-link :to="`/keyblocks/${keyblockResults.hash}`">
            {{ keyblockResults.hash }}
          </app-link>
        </td>
      </tr>
    </table>
  </app-panel>
</template>
<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

defineProps({
  keyblockResults: {
    type: Object,
    required: true,
  },
})
</script>
