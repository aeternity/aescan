<template>
  <div>
    <table
      v-for="microblock in microblocks.data"
      :key="microblock.hash"
      class="keyblock-microblocks-table-condensed__table">
      <tbody>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.microblockHash }}
            </hint-tooltip>
            Hash
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            <value-hash-ellipsed
              :hash="microblock.hash"
              :link-to="`/microblocks/${microblock.hash}`"/>
          </td>
        </tr>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.time }}
            </hint-tooltip>
            <time-toggle-button class="keyblock-microblocks-table-condensed__button"/>
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            <timestamp-label :timestamp="microblock.time"/>
          </td>
        </tr>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.microblockTransactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            {{ microblock.transactionsCount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style scoped>
.keyblock-microblocks-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
