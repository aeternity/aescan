<template>
  <div>
    <table
      v-for="transfer in nftTransfers.data"
      :key="transfer.hash"
      class="contract-call-transactions-table-condensed__table">
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Hash
            <template #tooltip>
              <!--              {{ contractsHints.callTransactionsHash }}-->
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/transactions/${transfer.txHash}`"
            :hash="transfer.txHash"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Time
            <template #tooltip>
              <!--              {{ contractsHints.callTransactionsTime }}-->
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <div>
            <app-link
              :to="`/keyblocks/${transfer.blockHeight}`">
              {{ transfer.blockHeight }}
            </app-link>
          </div>
          <!--          <datetime-label :datetime="nftTransfers.created"/>-->
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Token ID
            <template #tooltip>
              <!--              {{ contractsHints.callTransactionsCaller }}-->
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          {{ transfer.tokenID }}
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Recipient
            <template #tooltip>
              <!--              {{ contractsHints.callTransactionsCaller }}-->
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${transfer.recipient}`"
            :hash="transfer.recipient"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Sender
            <template #tooltip>
              <!--              {{ contractsHints.callTransactionsCaller }}-->
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${transfer.sender}`"
            :hash="transfer.sender"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  nftTransfers: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.contract-call-transactions-table-condensed {
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
