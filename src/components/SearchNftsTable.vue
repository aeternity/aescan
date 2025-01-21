<template>
  <table class="search-nfts-table">
    <thead>
      <tr>
        <th>
          Collection Name
          <hint-tooltip>
            {{ nftsHints.collectionName }}
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
        :key="nft.contractId">
        <td>
          <app-link
            :to="`/nfts/${nft.contractId}`"
            class="search-nfts-table__link">
            {{ nft.name }}
          </app-link>
        </td>
        <td>
          <value-hash-ellipsed
            :link-to="`/contracts/${nft.contractId}`"
            :hash="nft.contractId"/>
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
.search-nfts-table {
  margin-bottom: var(--space-4);

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }
}
</style>
