<template>
  <!--  todo hints-->
  <!--  todo imports-->
  <div>
    <table
      v-for="account in topAccounts"
      :key="account.account"
      class="top-accounts-table-condensed__table">
      <tbody>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <app-tooltip>
              Rank
              <template #tooltip>
                {{ stateChannelsHints.stateChannelId }}
              </template>
            </app-tooltip>
          </th>
          <td class="top-accounts-table-condensed__data">
            {{ account.rank }}.
          </td>
        </tr>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <app-tooltip>
              Account
              <template #tooltip>
                {{ stateChannelsHints.status }}
              </template>
            </app-tooltip>
          </th>
          <td class="top-accounts-table-condensed__data">
            <app-link
              :to="`/accounts/${account.account}`">
              {{ account.account }}
            </app-link>
          </td>
        </tr>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <app-tooltip>
              % Of Circulating
              <template #tooltip>
                {{ stateChannelsHints.participants }}
              </template>
            </app-tooltip>
          </th>
          <td class="top-accounts-table-condensed__data">
            {{ account.percentage }} %
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

defineProps({
  topAccounts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.top-accounts-table-condensed {
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
