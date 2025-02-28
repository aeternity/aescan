<template>
  <table class="dashboard-keyblock-table-condensed">
    <tbody>
      <tr>
        <th class="dashboard-keyblock-table-condensed__header">
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
          Height
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table-condensed__header">
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
          Beneficiary
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <value-hash-ellipsed
            class="dashboard-keyblock-table-condensed__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table-condensed__header">
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
          Hash
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"
            class="dashboard-keyblock-table-condensed__value-hash-ellipsed"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table-condensed__header">
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
          Reward
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
          <price-label
            :price="stats?.blockReward"
            class="dashboard-keyblock-table-condensed__price"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table-condensed__column-start">
          <hint-tooltip class="dashboard-keyblock-table-condensed__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
          <time-toggle-button>Mined</time-toggle-button>
        </th>
        <td class="dashboard-keyblock-table-condensed__data">
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
.dashboard-keyblock-table-condensed {
  &__price {
    justify-content: flex-end;
  }

  &__data {
    text-align: right;
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }
}
</style>
