<template>
  <app-panel class="transaction-pointers-panel">
    <template #title>
      NAME POINTERS
    </template>
    <table>
      <tbody>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Account
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
          </th>
          <td class="transaction-pointers-panel__data">
            <app-link
              v-if="pointers.account_pubkey"
              :to="`/accounts/${pointers.account_pubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.account_pubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.account_pubkey) }}
              </span>
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Channel
            <hint-tooltip>
              {{ namesHints.channelPointer }}
            </hint-tooltip>
          </th>
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.channel) }}
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Smart Contract
            <hint-tooltip>
              {{ namesHints.contractPointer }}
            </hint-tooltip>
          </th>
          <td class="transaction-pointers-panel__data">
            <app-link
              v-if="pointers.contract_pubkey"
              :to="`/contracts/${pointers.contract_pubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.contract_pubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.contract_pubkey) }}
              </span>
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Oracle
            <hint-tooltip>
              {{ namesHints.oraclePointer }}
            </hint-tooltip>
          </th>
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.oracle_pubkey) }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const props = defineProps({
  transactionData: {
    type: Object,
    required: true,
  },
})
const pointers = computed(() => {
  return props.transactionData.pointers.reduce(
    (accumulator, pointer) => ({
      ...accumulator,
      [pointer.key]: pointer.id,
    }),
    {},
  )
})
</script>

<style scoped>
.transaction-pointers-panel {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: var(--space-1);
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 28px;
    padding-top: var(--space-0);

    @media (--mobile) {
      padding-top: var(--space-1);
      display: table-cell;
    }
  }

}
</style>
