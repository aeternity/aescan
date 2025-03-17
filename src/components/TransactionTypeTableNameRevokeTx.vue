<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
          Name
        </th>
        <td>
          <app-link
            v-if="transactionData.name"
            :to="`/names/${transactionData.name}`">
            {{ transactionData.name }}
          </app-link>
          <template v-else>
            {{ formatNullable(transactionData.name) }}
          </template>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ namesHints.lastOwner }}
          </hint-tooltip>
          Last Owner
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.accountId}`">
            {{ transactionData.accountId }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
@import url("../assets/styles/utilities/panel-detail.css");

.transaction-type-panel-name-revoke-tx {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
