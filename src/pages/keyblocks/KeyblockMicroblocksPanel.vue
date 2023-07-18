<template>
  <app-panel>
    <table>
      <tr>
        <th>Hash</th>
        <th>Time</th>
        <th>Transactions Count</th>
      </tr>
      <tr v-for="microblock in microblocks.data">
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
  </app-panel>
</template>
<script setup>
defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
