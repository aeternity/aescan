<template>
  <table class="search-names-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.name }}
          </hint-tooltip>
        </th>
        <th>
          Status
          <hint-tooltip>
            {{ namesHints.status }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tbody>
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
      </tbody>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '../utils/hints/namesHints'

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
