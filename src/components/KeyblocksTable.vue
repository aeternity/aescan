<template>
  <table class="keyblocks-table">
    <thead>
      <tr>
        <th>
          Block
          <hint-tooltip>
            {{ keyblocksHints.transactionHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ keyblocksHints.transactionTime }}
          </hint-tooltip>
        </th>
        <th>
          Transactions Count
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <th>
          Microblocks Count
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <th>
          Fee Recipient
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <th>
          Info
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <!--        <th>-->
        <!--          Reward -->
        <!--          <hint-tooltip>-->
        <!--            {{ keyblocksHints.transactionData }}-->
        <!--          </hint-tooltip>-->
        <!--        </th>-->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="keyblock in keyblocks.data"
        :key="keyblock.height">
        <td>
          <!--          {{ keyblock.block }}-->
          <value-hash-ellipsed
            :hash="keyblock.hash"
            :link-to="`/keyblocks/${keyblock.hash}`"/>
        </td>
        <td>
          <block-time-cell
            :height="keyblock.block"
            :timestamp="keyblock.time"/>
        </td>

        <td>
          {{ keyblock.transactionsCount }}
        </td>
        <td>
          {{ keyblock.microBlocksCount }}
        </td>

        <td>
          <value-hash-ellipsed
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary}`"/>

        </td>
        <td>
          {{ keyblock.info }}
        </td>

      </tr>
    </tbody>
  </table>
</template>

<script setup>
import HintTooltip from '@/components/HintTooltip'
import { keyblocksHints } from "~/utils/hints/keyblocksHints";

defineProps({
  keyblocks: {
    type: Object,
    required: true,
  },
  stats: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.keyblock-table {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      padding: var(--space-2) 0 var(--space-1);
    }
  }

  &__data {
    text-align: right;

    @media (--desktop) {
      padding: var(--space-2) 0 var(--space-1);
    }
  }

  &__value-hash-ellipsed {
    font-weight: 400;
  }

  &__column-start {
    padding-right: 28px;
  }

  &__column-end {
    padding-left: 15%;
  }

  &__table-responsive {
    @media (--desktop) {
      display: none;
    }
  }

  &__table {
    display: none;

    @media (--desktop) {
      display: block;
    }
  }

  &__tooltip {
    margin-left: var(--space-0);
  }
}
</style>
