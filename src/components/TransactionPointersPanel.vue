<template>
  <app-panel class="transaction-pointers-panel">
    <header class="transaction-pointers-panel__header">
      <h2 class="transaction-pointers-panel__heading h3">
        NAME POINTERS
      </h2>
    </header>
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
              v-if="pointers.account_pubkey"
              :to="`/accounts/${pointers.account_pubkey}`">
              <span class="transaction-pointers-panel__link-text">
                {{ pointers.account_pubkey }}
              </span>
              <span class="transaction-pointers-panel__link-text-ellipse">
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
              <span class="transaction-pointers-panel__link-text">
                {{ pointers.contract_pubkey }}
              </span>
              <span class="transaction-pointers-panel__link-text-ellipse">
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
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.oracle_pubkey) }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '../utils/hints/namesHints'
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
  padding: var(--space-4) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__heading {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__header {
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__link-text {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__link-text-ellipse {
    @media (--desktop) {
      display: none;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
