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
        <app-link :to="`/micro-blocks/${microblock.hash}`">
          {{ microblock.hash }}
        </app-link>
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

defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
