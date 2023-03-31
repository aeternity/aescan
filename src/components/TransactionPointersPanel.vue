<template>
  <app-panel class="transaction-pointers-panel">
    <header class="transaction-pointers-panel__header">
      <h3 class="transaction-pointers-panel__heading">
        NAME POINTERS
      </h3>
    </header>
    <table class="transaction-pointers-panel__table">
      <tbody>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Account
          </th>
          <td class="transaction-pointers-panel__data">
            <value-hash-ellipsed
              v-if="pointers.account_pubkey"
              :hash="pointers.account_pubkey"
              :link-to="`/accounts/${pointers.account_pubkey}`"/>
            <template v-else>
              {{ formatNullable(pointers.account_pubkey) }}
            </template>
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Channel
          </th>
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.channel) }}
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Smart Contracts
          </th>
          <td class="transaction-pointers-panel__data">
            <value-hash-ellipsed
              v-if="pointers.contract_pubkey"
              :hash="pointers.contract_pubkey"
              :link-to="`/contracts/${pointers.contract_pubkey}`"/>
            <template v-else>
              {{ formatNullable(pointers.contract_pubkey) }}
            </template>
          </td>
        </tr>
        <tr class="transaction-pointers-panel__row">
          <th class="transaction-pointers-panel__table-header">
            Oracle
          </th>
          <td class="transaction-pointers-panel__data">
            {{ formatNullable(pointers.oracle_pubkey) }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script>
import AppPanel from '@/components/AppPanel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { formatNullable } from '@/utils/format'

export default {
  name: 'TransactionPointersPanel',
  components: {
    AppPanel,
    ValueHashEllipsed,
  },
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pointers() {
      return this.transactionData.pointers.reduce(
        (accumulator, pointer) => ({
          ...accumulator,
          [pointer.key]: pointer.id,
        }),
        {},
      )
    },
  },
  methods: {
    formatNullable,
  },
}
</script>

<style scoped>
.transaction-pointers-panel {
  padding: var(--space-4) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__heading {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.03em;
    margin-bottom: var(--space-4);
    @media (--desktop) {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 0;
    }
  }

  &__header {
    margin-bottom: var(--space-5);
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

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
