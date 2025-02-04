<template>
  <div>
    <table
      v-for="nft in nfts.data"
      :key="nft.contractId"
      class="search-nfts-table-condensed__table">
      <tbody>
        <tr class="search-nfts-table-condensed__row">
          <th class="search-nfts-table-condensed__header">
            <hint-tooltip>
              {{ nftsHints.collectionName }}
            </hint-tooltip>
            Collection Name
          </th>
          <td class="search-nfts-table-condensed__data">
            <app-link
              :to="`/nfts/${nft.contractId}`"
              class="search-nfts-table-condensed__link">
              {{ nft.name }}
            </app-link>
          </td>
        </tr>
        <tr class="search-nfts-table-condensed__row">
          <th class="search-nfts-table-condensed__header">
            <hint-tooltip>
              {{ nftsHints.smartContractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td class="search-nfts-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/contracts/${nft.contractId}`"
              :hash="nft.contractId"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.search-nfts-table-condensed {
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

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }
}
</style>
