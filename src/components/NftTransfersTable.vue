<template>
  <table class="nft-transfers-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
          <!--            {{ contractsHints.contractId }}-->
          </hint-tooltip>
        </th>
        <th>
          Time
          <hint-tooltip>
          <!--            {{ contractsHints.created }}-->
          </hint-tooltip>
        </th>
        <th>
          Token ID
          <hint-tooltip>
          <!--            {{ contractsHints.hash }}-->
          </hint-tooltip>
        </th>
        <th>
          Recipient
          <hint-tooltip>
          <!--            {{ contractsHints.creator }}-->
          </hint-tooltip>
        </th>
        <th>
          Sender
          <hint-tooltip>
          <!--            {{ contractsHints.creator }}-->
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transfer in nftTransfers.data"
        :key="transfer.contractId">
        <td class="nft-transfers-table__data">
          <value-hash-ellipsed
            :link-to="`/transactions/${transfer.txHash}`"
            :hash="transfer.txHash"/>
        </td>
        <td class="nft-transfers-table__data">
          <div>
            <app-link
              :to="`/keyblocks/${transfer.blockHeight}`">
              {{ transfer.blockHeight }}
            </app-link>
          </div>
        <!--          <datetime-label :datetime="nftTransfers.created"/>-->
        </td>
        <td class="nft-transfers-table__data">
          {{ transfer.tokenID }}
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
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import HintTooltip from '@/components/HintTooltip'

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
