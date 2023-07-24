<template>
  <table class="keyblock-table">
    <tbody>
      <tr>
        <th class="keyblock-table__header keyblock-table__column-start">
          Height
          <hint-tooltip class="keyblock-table__tooltip">
            Total number of keyblocks that have been added to the blockchain in a sequential order, starting
            from the genesis block. Each new block added to the chain increases the height by one.
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
            The miner who successfully added the keyblock to the blockchain and received a block reward.
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
            Unique identifier of the latest keyblock. It also serves as a reference point for subsequent
            keyblocks to be added to the blockchain.
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
            Amount that was paid to the miner who added the keyblock to the blockchain, as an incentive for
            their participation and contribution to the network.
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data">
          {{ formatNullable(formatAePrice(stats?.blockReward)) }}
        </td>
      </tr>

      <tr>
        <th class="keyblock-table__column-start">
          Mined
          <hint-tooltip class="keyblock-table__tooltip">
            The exact moment when the keyblock was successfully added to the blockchain.
          </hint-tooltip>
        </th>
        <td class="keyblock-table__data ">
          <datetime-label :datetime="keyblock.mined"/>
        </td>
        <th class="keyblock-table__column-end">
          BRI-Reward
          <hint-tooltip class="keyblock-table__tooltip">
            A fraction of the keyblock reward that was granted to æternity crypto foundation to fund its
            activities.
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
    border-bottom: 1px solid var(--color-midnight-15);
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
