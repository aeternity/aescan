<template>
  <app-panel class="nft-details-panel">
    <table>
      <tbody>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.smartContractId }}
            </hint-tooltip>
            Contract ID
          </th>
          <td class="nft-details-panel__data">
            <div class="u-hidden-mobile">
              <copy-chip :label="nftDetails.contractId"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(nftDetails.contractId)"
                :clipboard-text="nftDetails.contractId"/>
            </div>
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.collectionName }}
            </hint-tooltip>
            Collection Name
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.name }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.owners }}
            </hint-tooltip>
            Owners
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.nftOwners }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.amount }}
            </hint-tooltip>
            Amount
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.nftsAmount }}
          </td>
        </tr>
        <tr
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.extensions }}
            </hint-tooltip>
            Extensions
          </th>
          <td class="nft-details-panel__data">
            <div
              v-if="!!nftDetails.extensions.length"
              class="nft-details-panel__extensions">
              <app-chip
                v-for="extension in nftDetails.extensions"
                :key="extension"
                size="sm">
                {{ extension }}
              </app-chip>
            </div>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr
          v-if="nftDetails.tokenLimit !== null"
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.tokenLimit }}
            </hint-tooltip>
            Token limit
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.tokenLimit }}
          </td>
        </tr>
        <tr
          v-if="nftDetails.templateLimit !== null"
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Template limit
            <hint-tooltip>
              {{ nftsHints.templateLimit }}
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.templateLimit }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

defineProps({
  nftDetails: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.nft-details-panel {
  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }
}
</style>
