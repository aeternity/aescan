<template>
  <table class="search-names-table">
    <tr>
      <th>Name</th>
      <th>Status</th>
    </tr>
    <tr
      v-for="name in names.data"
      :key="name.name">
      <td>
        <app-link :to="`/names/${name.name}`">
          {{ name.name }}
        </app-link>
      </td>
      <td>{{ name.status }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.search-names-table {
  margin-bottom: var(--space-4);
}
</style>
