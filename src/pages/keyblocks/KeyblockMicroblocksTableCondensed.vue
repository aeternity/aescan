<template>
  <div class="keyblock-microblocks-table-condensed">
    <table
      v-for="microblock in microblocks.data"
      :key="microblock.hash"
      class="keyblock-microblocks-table-condensed__table">
      <tbody>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <app-tooltip>
              Hash
            </app-tooltip>
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            <!--            todo full link-->
            <value-hash-ellipsed
              :hash="microblock.hash"
              :link-to="`/micro-blocks/${microblock.hash}`"/>
          </td>
        </tr>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <app-tooltip>
              Time
            </app-tooltip>
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            <datetime-label :datetime="microblock.time"/>
          </td>
        </tr>
        <tr class="keyblock-microblocks-table-condensed__row">
          <th class="keyblock-microblocks-table-condensed__header">
            <app-tooltip>
              Transactions Count
            </app-tooltip>
          </th>
          <td class="keyblock-microblocks-table-condensed__data">
            <div>
              {{ microblock.transactionsCount }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.keyblock-microblocks-table-condensed {
  &__table {
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    vertical-align: top;
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
