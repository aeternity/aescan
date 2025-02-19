<template>
  <table class="dashboard-keyblock-table">
    <tbody>
      <tr>
        <th class="dashboard-keyblock-table__heade">
          Height
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.height }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table__data">
          <app-link
            :to="`/keyblocks/${keyblock.height}`">
            {{ keyblock.height }}
          </app-link>
        </td>
      </tr>

      <tr>
        <!--        todo fix table-->
        <th class="dashboard-keyblock-table__header">
          Beneficiary
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.beneficiary }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table__data">
          <value-hash-ellipsed
            class="dashboard-keyblock-table__value-hash-ellipsed"
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary }`"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table__header">
          Hash
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.hash }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table__data">
          <value-hash-ellipsed
            :link-to="`/keyblocks/${keyblock.hash}`"
            :hash="keyblock.hash"
            class="dashboard-keyblock-table__value-hash-ellipsed"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table__header">
          Reward
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.briReward }}
          </hint-tooltip>
        </th>
        <td class="dashboard-keyblock-table__data">
          <price-label :price="stats?.blockReward"/>
        </td>
      </tr>

      <tr>
        <th class="dashboard-keyblock-table__column-start">
          <time-toggle-button>Mined</time-toggle-button>
          <hint-tooltip class="dashboard-keyblock-table__tooltip">
            {{ keyblocksHints.mined }}
          </hint-tooltip>
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

  }

}
</style>
