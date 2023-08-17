<template>
  <table
    v-for="name in namesFound.data"
    :key="name.payload.name"
    class="search-results-names-table-condensed__table">
    <tbody>
      <tr class="search-results-names-table-condensed__row">
        <th class="search-results-names-table-condensed__header">
          <app-tooltip>
            Name
          </app-tooltip>
        </th>
        <td class="search-results-names-table-condensed__data">
          <app-link :to="`/names/${name.payload.name}`">
            {{ name.payload.name }}
          </app-link>
        </td>
      </tr>
      <tr class="search-results-names-table-condensed__row">
        <th class="search-results-names-table-condensed__header">
          <app-tooltip>
            Status
          </app-tooltip>
        </th>
        <td class="search-results-names-table-condensed__data">
          {{ parseStatus(name.payload) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '~/components/AppLink'
import AppTooltip from '~/components/AppTooltip'

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

<style scoped>
.search-results-names-table-condensed {
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
