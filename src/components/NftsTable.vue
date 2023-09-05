<template>
  <table class="nfts-table">
    <thead>
      <tr>
        <th>
          Collection Name
          <hint-tooltip>
            {{ nftsHints.collectionName }}
          </hint-tooltip>
        </th>
        <th>
          Owners
          <hint-tooltip>
            {{ nftsHints.owners }}
          </hint-tooltip>
        </th>
        <th>
          Amount
          <hint-tooltip>
            {{ nftsHints.amount }}
          </hint-tooltip>
        </th>
        <th>
          Smart Contract ID
          <hint-tooltip>
            {{ nftsHints.smartContractId }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="nft in nfts.data"
        :key="nft.contractId ">
        <td class="nfts-table__data">
          <app-link :to="`/nfts/${nft.contractId}`">
            {{ nft.name }}
          </app-link>
        </td>
        <td class="nfts-table__data">
          {{ nft.nftOwners }}
        </td>
        <td class="nfts-table__data">
          {{ nft.nftsAmount }}
        </td>
        <td class="nfts-table__data">
          <app-link :to="`/contracts/${nft.contractId}`">
            {{ formatEllipseHash(nft.contractId) }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

defineProps({
  nfts: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.nfts-table {
  margin-bottom: var(--space-4);

  &__data {
    vertical-align: top;
  }
}
</style>
