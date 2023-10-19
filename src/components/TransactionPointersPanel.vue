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
          <td class="transaction-pointers-panel__data">
            <app-link
              v-if="pointers.accountPubkey"
              :to="`/accounts/${pointers.accountPubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.accountPubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.accountPubkey) }}
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
              v-if="pointers.contractPubkey"
              :to="`/contracts/${pointers.contractPubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.contractPubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.contractPubkey) }}
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
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.oraclePubkey) }}
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
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
