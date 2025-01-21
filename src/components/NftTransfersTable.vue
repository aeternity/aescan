<template>
  <table class="nft-transfers-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ nftsHints.contractId }}
          </hint-tooltip>
        </th>
        <th>
          Time
          <hint-tooltip>
            {{ nftsHints.transferTime }}
          </hint-tooltip>
        </th>
        <th>
          Token ID
          <hint-tooltip>
            {{ nftsHints.transferTokenId }}
          </hint-tooltip>
        </th>
        <th>
          Recipient
          <hint-tooltip>
            {{ nftsHints.transferRecipient }}
          </hint-tooltip>
        </th>
        <th>
          Sender
          <hint-tooltip>
            {{ nftsHints.transferSender }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transfer in nftTransfers.data"
        :key="transfer.txHash">
        <td>
          <value-hash-ellipsed
            :link-to="`/transactions/${transfer.txHash}`"
            :hash="transfer.txHash"/>
        </td>
        <td class="nft-transfers-table__data">
          <block-time-cell
            :height="transfer.height"
            :timestamp="transfer.time"/>
        </td>
        <td class="nft-transfers-table__data">
          {{ transfer.tokenId }}
        </td>
        <td class="nft-transfers-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${transfer.recipient}`"
            :hash="transfer.recipient"/>
        </td>
        <td class="nft-transfers-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${transfer.sender}`"
            :hash="transfer.sender"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

defineProps({
  nftTransfers: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.nft-transfers-table {
  margin-bottom: var(--space-4);

  &__data {
    vertical-align: top;
  }
}
</style>
