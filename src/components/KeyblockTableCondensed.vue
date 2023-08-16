<template>
  <table>
    <tbody>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Height
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Hash
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"/>
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Mined
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          <datetime-label :datetime="keyblock.mined"/>
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Beneficiary
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          <value-hash-ellipsed
            class="keyblock-table-condensed__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Beneficiary-Reward
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.beneficiaryReward }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          {{ formatNullable(formatAePrice(stats?.blockReward)) }}
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          BRI-Reward
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
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
.keyblock-table-condensed {
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

  &__tooltip {
    margin-left: var(--space-0);
  }
}
</style>
