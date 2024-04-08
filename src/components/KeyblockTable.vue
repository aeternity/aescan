<template>
  <table class="keyblock-table">
    <tbody>
      <tr>
        <th class="keyblock-table__header keyblock-table__column-start">
          Height
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
        <th class="keyblock-table__header keyblock-table__column-end">
          Beneficiary
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          <value-hash-ellipsed
            class="keyblock-table__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>

      <tr>
        <th class="keyblock-table__header keyblock-table__column-start">
          Hash
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"
            class="keyblock-table__value-hash-ellipsed"/>
        </td>
        <th class="keyblock-table__header keyblock-table__column-end">
          Beneficiary-Reward
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          {{ formatNullable(formatAePrice(stats?.blockReward)) }}
        </td>
      </tr>

      <tr>
        <th class="keyblock-table__column-start">
          <time-switch-button>Mined</time-switch-button>
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          <datetime-label :datetime="keyblock.mined"/>
        </td>
        <th class="keyblock-table__column-end">
          BRI-Reward
          <hint-tooltip class="keyblock-table__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          {{ formatNullable(formatAePrice(stats?.devReward)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import DatetimeLabel from '@/components/DatetimeLabel'
import { formatAePrice, formatNullable } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  keyblock: {
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
