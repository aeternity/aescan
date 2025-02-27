<template>
  <table class="dashboard-keyblock-table">
    <tbody>
      <tr>
        <th class="dashboard-keyblock-table__header dashboard-keyblock-table__column-start">
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
          Height
        </th>
        <td class="dashboard-keyblock-table__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
        <th class="dashboard-keyblock-table__header dashboard-keyblock-table__column-end">
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
          Beneficiary
        </th>
        <td class="dashboard-keyblock-table__data">
          <value-hash-ellipsed
            class="dashboard-keyblock-table__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table__header dashboard-keyblock-table__column-start">
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
          Hash
        </th>
        <td class="dashboard-keyblock-table__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"
            class="dashboard-keyblock-table__value-hash-ellipsed"/>
        </td>
        <th class="dashboard-keyblock-table__header dashboard-keyblock-table__column-end">
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
          Reward
        </th>
        <td class="dashboard-keyblock-table__data">
          <price-label :price="stats?.blockReward"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table__column-start">
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
          <time-toggle-button>Mined</time-toggle-button>
        </th>
        <td class="dashboard-keyblock-table__data">
          <timestamp-label :timestamp="keyblock.mined"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

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
.dashboard-keyblock-table {
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
    padding-left: 13%;
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
