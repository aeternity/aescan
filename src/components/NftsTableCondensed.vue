<template>
  <div class="nfts-table-condensed">
    <table
      v-for="nft in nfts.data"
      :key="nft.contractId"
      class="nfts-table-condensed__table">
      <tbody>
        <tr class="nfts-table-condensed__row">
          <th class="nfts-table-condensed__header">
            <app-tooltip>
              Collection Name
              <template #tooltip>
                {{ nftsHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="nfts-table-condensed__data">
            <app-link :to="`/nfts/${nft.contractId}`">
              {{ nft.name }}
            </app-link>
          </td>
        </tr>

        <tr class="nfts-table-condensed__row">
          <th class="nfts-table-condensed__header">
            <app-tooltip>
              Created
              <template #tooltip>
                {{ nftsHints.created }}
              </template>
            </app-tooltip>
          </th>
          <td class="nfts-table-condensed__data">
            <block-time-cell
              :height="nft.blockHeight"
              :timestamp="nft.creationTime"/>
          </td>
        </tr>
        <tr class="nfts-table-condensed__row">
          <th class="nfts-table-condensed__header">
            <app-tooltip>
              Owners
              <template #tooltip>
                {{ nftsHints.owners }}
              </template>
            </app-tooltip>
          </th>
          <td class="nfts-table-condensed__data">
            {{ nft.nftOwners }}
          </td>
        </tr>

        <tr class="nfts-table-condensed__row">
          <th class="nfts-table-condensed__header">
            <app-tooltip>
              Amount
              <template #tooltip>
                {{ nftsHints.amount }}
              </template>
            </app-tooltip>
          </th>
          <td class="nfts-table-condensed__data">
            {{ nft.nftsAmount }}
          </td>
        </tr>

        <tr class="nfts-table-condensed__row">
          <th class="nfts-table-condensed__header">
            <app-tooltip>
              Smart Contract ID
              <template #tooltip>
                {{ nftsHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nfts-table-condensed__data">
            <app-link :to="`/contracts/${nft.contractId}`">
              {{ formatEllipseHash(nft.contractId) }}
            </app-link>
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
.nfts-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
