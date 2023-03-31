<template>
  <table class="transaction-type-panel-ga-attach-tx__table">
    <tbody>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Status
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <transaction-type-status-label :status="transactionData.return_type"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Account
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link :to="`/accounts/${transactionData.owner_id}`">
            {{ transactionData.owner_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Smart Contract ID
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          <app-link :to="`/contracts/${transactionData.contract_id}`">
            {{ formatNullable(transactionData.contract_id) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Auth function
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ transactionData.auth_fun_name }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Arguments
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ formatNullable(transactionData.args) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Gas limit /
          <wbr>
          Gas price
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ formatNullable(transactionData.gas) }}
          /
          {{
            formatAePrice(formatAettosToAe(transactionData.gas_price), null)
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-attach-tx__row">
        <th class="transaction-type-panel-ga-attach-tx__table-header">
          Gas used /
          <wbr>
          Gas costs
        </th>
        <td class="transaction-type-panel-ga-attach-tx__data">
          {{ formatNullable(transactionData.gas_used) }}
          /
          {{
            formatNullable(formatAePrice(formatAettosToAe(gasCosts), null))
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppLink from '@/components/AppLink'
import TransactionTypeStatusLabel from '@/components/TransactionTypeStatusLabel'
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'

export default {
  name: 'TransactionTypeTableGAAttachTx',
  components: {
    AppLink,
    TransactionTypeStatusLabel,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    gasCosts() {
      return this.transactionData.gas_used * this.transactionData.gas_price
    },
  },
  methods: {
    formatAePrice,
    formatAettosToAe,
    formatNullable,
  },
}
</script>

<style scoped>
.transaction-type-panel-ga-attach-tx {
  &__table {
    table-layout: fixed;
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
