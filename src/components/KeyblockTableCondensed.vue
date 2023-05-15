<template>
  <table>
    <tbody>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Height
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            Total number of keyblocks that have been added to the blockchain in a sequential order, starting
            from the genesis block. Each new block added to the chain increases the height by one.
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          {{ keyblock.height }}
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Hash
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            Unique identifier of the latest keyblock. It also serves as a reference point for subsequent
            keyblocks to be added to the blockchain.
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          <value-hash-ellipsed :hash="keyblock.hash"/>
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          Mined
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            The exact moment when the keyblock was successfully added to the blockchain.
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
            The miner who successfully added the keyblock to the blockchain and received a block reward.
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
            Amount that was paid to the miner who added the keyblock to the blockchain, as an incentive for
            their participation and contribution to the network.
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          {{ formatNullable(formatAePrice(stats?.block_reward)) }}
        </td>
      </tr>
      <tr class="keyblock-table-condensed__row">
        <th class="keyblock-table-condensed__header">
          BRI-Reward
          <hint-tooltip class="keyblock-table-condensed__tooltip">
            A fraction of the keyblock reward that was granted to æternity crypto foundation to fund its
            activities.
          </hint-tooltip>
        </th>
        <td class="keyblock-table-condensed__data">
          {{ formatNullable(formatAePrice(stats?.dev_reward)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
  }

  &__value-hash-ellipsed {
    font-weight: 400;
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__tooltip {
    margin-left: var(--space-0);
  }
}
</style>
