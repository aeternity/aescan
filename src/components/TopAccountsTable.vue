<template>
  <table class="top-accounts-table">
    <tr>
      <th>
        Rank
        <hint-tooltip>
          {{ stateChannelsHints.stateChannelId }}
        </hint-tooltip>
      </th>
      <th>
        Account
        <hint-tooltip>
          {{ stateChannelsHints.stateChannelId }}
        </hint-tooltip>
      </th>
      <th>
        % Of Circulating
        <hint-tooltip>
          {{ stateChannelsHints.stateChannelId }}
        </hint-tooltip>
      </th>
    </tr>
    <tr
      v-for="account in topAccounts"
      :key="account.account">
      <td>{{ account.rank }}.</td>
      <td>
        <app-link
          :to="`/accounts/${account.account}`">
          {{ account.account }}
        </app-link>
      </td>
      <td>{{ account.percentage }} %</td>
    </tr>
  </table>
</template>
<script setup>
import { stateChannelsHints } from '~/utils/hints/stateChannelsHints'

defineProps({
  topAccounts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.top-accounts-table {
  margin-bottom: var(--space-4);
}
</style>
