<template>
  <app-panel class="transaction-pointers-panel">
    <template #heading>
      NAME POINTERS
    </template>
    <table class="transaction-pointers-panel__table">
      <tbody>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Account
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
          </th>
          <td>
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
              ---
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
          <td>
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
          <td>
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
              ---
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
          <td>
            {{ formatNullable(pointers.oracle_pubkey) }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppPanel from '@/components/AppPanel'
import { formatNullable } from '@/utils/format'

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
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: 400px;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
