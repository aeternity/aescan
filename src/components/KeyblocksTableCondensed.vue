<template>
  <div class="keyblocks-table-condensed">
    <table
      v-for="(keyblock, index) in keyblocks.data"
      :key="index"
      class="keyblocks-table-condensed__table">
      <tbody>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <app-tooltip>
              Block
              <template #tooltip>
                {{ keyblocksHints.keyblockHash }}
              </template>
            </app-tooltip>
          </th>
          <td class="keyblocks-table-condensed__data">
            <value-hash-ellipsed
              :hash="keyblock.hash"
              :link-to="`/keyblocks/${keyblock.hash}`"/>
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <app-tooltip>
              <time-toggle-button/>
              <template #tooltip>
                {{ keyblocksHints.time }}
              </template>
            </app-tooltip>
          </th>
          <td class="keyblocks-table-condensed__data">
            <block-time-cell
              :height="keyblock.block"
              :timestamp="keyblock.time"/>
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <app-tooltip>
              Transactions Count
              <template #tooltip>
                {{ keyblocksHints.transactionsCount }}
              </template>
            </app-tooltip>
          </th>
          <td class="keyblocks-table-condensed__data">
            {{ keyblock.transactionsCount }}
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <app-tooltip>
              Microblocks Count
              <template #tooltip>
                {{ keyblocksHints.microblockCount }}
              </template>
            </app-tooltip>
          </th>
          <td class="keyblocks-table-condensed__data">
            {{ keyblock.microBlocksCount }}
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <app-tooltip>
              Fee Recipient
              <template #tooltip>
                {{ keyblocksHints.beneficiary }}
              </template>
            </app-tooltip>
          </th>

          <td class="keyblocks-table-condensed__data">
            <value-hash-ellipsed
              :hash="keyblock.beneficiary"
              :link-to="`/accounts/${keyblock.beneficiary}`"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import AppTooltip from '@/components/AppTooltip'

defineProps({
  keyblocks: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.keyblocks-table-condensed {
  padding: var(--space-4) 0 0;

  &__table {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: var(--space-1);
    }

    @media (--desktop) {
      padding: var(--space-4);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
