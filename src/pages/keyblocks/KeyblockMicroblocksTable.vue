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
        {{ microblock.hash }}
      </td>
      <td>
        {{ microblock.time }}
      </td>
      <td>
        {{ microblock.transactionsCount }}
      </td>
    </tr>
  </table>
</template>
<script setup>
const props = defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
