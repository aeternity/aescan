<template>
  <table class="verified-contract-table-condensed__table">
    <tr class="verified-contract-table-condensed__row">
      <th class="verified-contract-table-condensed__header">
        License
      </th>
      <td class="verified-contract-table-condensed__data">
        emVersion, MIT license
      </td>
    </tr>
    <tr class="verified-contract-table-condensed__row">
      <th class="verified-contract-table-condensed__header">
        Compiler Version
      </th>
      <td class="verified-contract-table-condensed__data">
        v3.06.8
      </td>
    </tr>
  </table>
</template>
<script>

</script>

<style scoped>
.verified-contract-table-condensed {
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
