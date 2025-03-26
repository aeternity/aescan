<template>
  <app-panel class="nft-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ nftsHints.smartContractId }}
            </hint-tooltip>
            Contract ID
          </th>
          <td>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ nftsHints.collectionName }}
            </hint-tooltip>
            Collection Name
          </th>
          <td>
            {{ nftDetails.name }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ nftsHints.owners }}
            </hint-tooltip>
            Owners
          </th>
          <td>
            {{ nftDetails.nftOwners }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ nftsHints.amount }}
            </hint-tooltip>
            Amount
          </th>
          <td>
            {{ nftDetails.nftsAmount }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ nftsHints.extensions }}
            </hint-tooltip>
            Extensions
          </th>
          <td>
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
          v-if="nftDetails.tokenLimit !== null">
          <th>
            <hint-tooltip>
              {{ nftsHints.tokenLimit }}
            </hint-tooltip>
            Token limit
          </th>
          <td>
            {{ nftDetails.tokenLimit }}
          </td>
        </tr>
        <tr v-if="nftDetails.templateLimit !== null">
          <th>
            Template limit
            <hint-tooltip>
              {{ nftsHints.templateLimit }}
            </hint-tooltip>
          </th>
          <td>
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
@import url("../assets/styles/utilities/_detail-table.css");

.nft-details-panel {
  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }
}
</style>
