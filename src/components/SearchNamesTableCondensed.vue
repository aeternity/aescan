<template>
  <div>
    <table
      v-for="name in names.data"
      :key="name.name"
      class="search-names-table-condensed__table">
      <tbody>
        <tr class="search-names-table-condensed__row">
          <th class="search-names-table-condensed__header">
            <app-tooltip>
              Name
            </app-tooltip>
          </th>
          <td class="search-names-table-condensed__data">
            <app-link :to="`/names/${name.name}`">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="search-names-table-condensed__row">
          <th class="search-names-table-condensed__header">
            <app-tooltip>
              Status
            </app-tooltip>
          </th>
          <td class="search-names-table-condensed__data">
            {{ name.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppLink from '~/components/AppLink'
import AppTooltip from '~/components/AppTooltip'

defineProps({
  names: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.search-names-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
