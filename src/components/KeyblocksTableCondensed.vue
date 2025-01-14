<template>
  <div class="keyblocks-table-condensed">
    <table
      v-for="(keyblock, index) in keyblocks.data"
      :key="index"
      class="keyblocks-table-condensed__table">
      <tbody>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.keyblockHash }}
            </hint-tooltip>
            Block
          </th>
          <td class="keyblocks-table-condensed__data">
            <value-hash-ellipsed
              :hash="keyblock.hash"
              :link-to="`/keyblocks/${keyblock.hash}`"/>
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.time }}
            </hint-tooltip>
            <time-toggle-button class="keyblocks-table-condensed__button"/>
          </th>
          <td class="keyblocks-table-condensed__data">
            <block-time-cell
              :height="keyblock.block"
              :timestamp="keyblock.time"/>
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.transactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td class="keyblocks-table-condensed__data">
            {{ keyblock.transactionsCount }}
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.microblockCount }}
            </hint-tooltip>
            Microblocks Count
          </th>
          <td class="keyblocks-table-condensed__data">
            {{ keyblock.microBlocksCount }}
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.beneficiary }}
            </hint-tooltip>
            Fee Recipient
          </th>

          <td class="keyblocks-table-condensed__data">
            <value-hash-ellipsed
              :hash="keyblock.beneficiary"
              :link-to="`/accounts/${keyblock.beneficiary}`"/>
          </td>
        </tr>
        <tr class="keyblocks-table-condensed__row">
          <th class="keyblocks-table-condensed__header">
            <hint-tooltip>
              {{ keyblocksHints.beneficiary }}
            </hint-tooltip>
            Beneficiary
          </th>

          <td class="keyblocks-table-condensed__data">
            <price-label :price="keyblock.beneficiaryReward"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

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

  &__button {
    margin-left: 3px;
  }
}
</style>
