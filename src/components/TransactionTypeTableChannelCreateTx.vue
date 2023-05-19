<template>
  <table class="transaction-type-panel-channel-create-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Channel id
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/state-channels/${transactionData.channel_id}`">
            {{ transactionData.channel_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Channel reserve
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{
            formatAePrice(
              formatAettosToAe(transactionData.channel_reserve),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Initiator / amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.initiator_id}`">
            {{ transactionData.initiator_id }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.initiator_amount),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Initiator delegates
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Responder / amount
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          <app-link :to="`/accounts/${transactionData.responder_id}`">
            {{ transactionData.responder_id }}
          </app-link>
          /
          {{
            formatAePrice(
              formatAettosToAe(transactionData.responder_amount),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Responder delegates
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.delegate_ids }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-create-tx__row">
        <th class="transaction-type-panel-channel-create-tx__table-header">
          Lock period
        </th>
        <td class="transaction-type-panel-channel-create-tx__data">
          {{ transactionData.lock_period }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-channel-create-tx {
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
