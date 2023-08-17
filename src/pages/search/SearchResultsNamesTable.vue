<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Status</th>
    </tr>
    <tr
      v-for="name in namesFound.data"
      :key="name.payload.name">
      <td>
        <app-link :to="`/names/${name.payload.name}`">
          {{ name.payload.name }}
        </app-link>
      </td>
      <td>{{ parseStatus(name.payload) }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  namesFound: {
    type: Object,
    required: true,
  },
})

// todo adapter
function parseStatus(name) {
  if (name.auctionEnd) {
    return 'In Auction'
  } else if (name.active) {
    return 'Active'
  } else {
    return 'Expired'
  }
}

</script>
