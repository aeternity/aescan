<template>
  <table>
    <tbody>
      <tr class="dashboard-keyblock-table-condensed__row">
        <th class="dashboard-keyblock-table-condensed__header">
          Height
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
      </tr>
      <tr class="dashboard-keyblock-table-condensed__row">
        <th class="dashboard-keyblock-table-condensed__header">
          Hash
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"/>
        </td>
      </tr>
      <tr class="dashboard-keyblock-table-condensed__row">
        <th class="dashboard-keyblock-table-condensed__header">
          <time-toggle-button>Mined</time-toggle-button>
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <timestamp-label :timestamp="keyblock.mined"/>
        </td>
      </tr>
      <tr class="dashboard-keyblock-table-condensed__row">
        <th class="dashboard-keyblock-table-condensed__header">
          Beneficiary
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <value-hash-ellipsed
            class="dashboard-keyblock-table-condensed__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>
      <tr class="dashboard-keyblock-table-condensed__row">
        <th class="dashboard-keyblock-table-condensed__header">
          Beneficiary Reward
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.beneficiaryReward }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <price-label :price="stats?.blockReward"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
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
.dashboard-keyblock-table-condensed {
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
