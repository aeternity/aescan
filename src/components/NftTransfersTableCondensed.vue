<template>
  <div>
    <table
      v-for="transfer in nftTransfers.data"
      :key="transfer.hash"
      class="contract-call-transactions-table-condensed__table">
      <tbody>
        <tr class="contract-call-transactions-table-condensed__row">
          <th class="contract-call-transactions-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ nftsHints.transferHash }}
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
              <time-switch-button/>
              <template #tooltip>
                {{ nftsHints.transferTime }}
              </template>
            </app-tooltip>
          </th>
          <td class="contract-call-transactions-table-condensed__data">
            <block-time-cell
              :height="transfer.height"
              :datetime="transfer.time"/>
          </td>
        </tr>
        <tr class="contract-call-transactions-table-condensed__row">
          <th class="contract-call-transactions-table-condensed__header">
            <app-tooltip>
              Token ID
              <template #tooltip>
                {{ nftsHints.transferTokenId }}
              </template>
            </app-tooltip>
          </th>
          <td class="contract-call-transactions-table-condensed__data">
            {{ transfer.tokenId }}
          </td>
        </tr>

        <tr class="contract-call-transactions-table-condensed__row">
          <th class="contract-call-transactions-table-condensed__header">
            <app-tooltip>
              Sender
              <template #tooltip>
                {{ nftsHints.transferSender }}
              </template>
            </app-tooltip>
          </th>
          <td class="contract-call-transactions-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/accounts/${transfer.sender}`"
              :hash="transfer.sender"/>
          </td>
        </tr>
        <tr class="contract-call-transactions-table-condensed__row">
          <th class="contract-call-transactions-table-condensed__header">
            <app-tooltip>
              Recipient
              <template #tooltip>
                {{ nftsHints.transferRecipient }}
              </template>
            </app-tooltip>
          </th>
          <td class="contract-call-transactions-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/accounts/${transfer.recipient}`"
              :hash="transfer.recipient"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'
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
