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
            class="dashboard-keyblock-table__height"
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
            :link-to="`/accounts/${keyblock.beneficiary}`"/>
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
          <price-label
            :price="stats?.blockReward"
            class="dashboard-keyblock-table__price"/>
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
        <template v-if="miningTime != null">
          <th class="dashboard-keyblock-table__column-end">
            <hint-tooltip class="dashboard-keyblock-table__tooltip">
              {{ keyblocksHints.miningTime }}
            </hint-tooltip>
            Mining Time
          </th>
          <td class="dashboard-keyblock-table__data">
            {{ formatMiningTime(miningTime) }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import { formatMiningTime } from '@/utils/format'

defineProps({
  keyblock: {
    type: Object,
    required: true,
  },
  stats: {
    type: Object,
    default: null,
  },
  miningTime: {
    type: Number,
    default: null,
  },
})
</script>

<style scoped>
.dashboard-keyblock-table {
  /* Override global th sizes — these are detail-table labels, not list headers */
  th {
    /* width:1% collapses each label column to its min-content, leaving both
       value (td) columns to share the remaining space equally. */
    width: 1%;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--text-dim);
    padding: 11px 0;
    white-space: nowrap;
    text-align: left;
  }

  td {
    /* width:50% makes both value columns compete for equal halves of
       the table, with label columns collapsing to min-content. */
    width: 50%;
    font-size: 13px;
    font-weight: 500;
    padding: 11px 0;
    text-align: right;
    border-bottom: 1px solid var(--border-soft);
  }

  tr:last-child td {
    border-bottom: 0;
  }

  &__header {
    border-bottom: 1px solid var(--border-soft);
  }

  &__data {
    text-align: right;
  }

  &__value-hash-ellipsed {
    font-weight: 400;
  }

  &__height {
    font-family: var(--font-monospaced);
  }

  &__column-start {
    padding-right: var(--space-2);
  }

  /* Gap between the two halves of the detail table.
     !important needed: th { padding:11px 0 } sets padding-left:0 for all th;
     this class selector should win on specificity but browsers may disagree. */
  &__column-end {
    @media (--desktop) {
      padding-left: var(--space-6) !important;
    }
  }

  &__tooltip {
    /* placeholder — gap + alignment handled in HintTooltip.vue directly */
  }

  &__price {
    justify-content: flex-end;
  }
}
</style>
