<template>
  <table>
    <tr>
      <th>Hash</th>
      <th>Time</th>
      <th>Transactions Count</th>
    </tr>
    <tr
      v-for="microblock in microblocks.data"
      :key="microblock.hash">
      <td>
        <value-hash-ellipsed
          :hash="microblock.hash"
          :link-to="`/micro-blocks/${microblock.hash}`"/>
      </td>
      <td>
        <datetime-label :datetime="microblock.time"/>
      </td>
      <td>
        {{ microblock.transactionsCount }}
      </td>
    </tr>
  </table>
</template>
<script setup>
import DatetimeLabel from '~/components/DatetimeLabel'
import ValueHashEllipsed from '~/components/ValueHashEllipsed'

defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
