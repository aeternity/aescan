<template>
  <app-panel class="nfts-details-panel">
    <table>
      <tbody>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.smartContractId }}
            </hint-tooltip>
            Contract ID
          </th>
          <td>
            <copy-chip
              :label="nftDetails.contractId"
              class="u-hidden-mobile"/>
            <copy-chip
              :label="formatEllipseHash(nftDetails.contractId)"
              :clipboard-text="nftDetails.contractId"
              class="u-hidden-desktop"/>
          </td>
        </tr>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.collectionName }}
            </hint-tooltip>
            Collection Name
          </th>
          <td>
            {{ nftDetails.name }}
          </td>
        </tr>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.owners }}
            </hint-tooltip>
            Owners
          </th>
          <td>
            {{ nftDetails.nftOwners }}
          </td>
        </tr>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.amount }}
            </hint-tooltip>
            Amount
          </th>
          <td>
            {{ nftDetails.nftsAmount }}
          </td>
        </tr>
        <tr
          class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.extensions }}
            </hint-tooltip>
            Extensions
          </th>
          <td>
            <div
              v-if="!!nftDetails.extensions.length"
              class="nfts-details-panel__extensions">
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
          class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            <hint-tooltip>
              {{ nftsHints.tokenLimit }}
            </hint-tooltip>
            Token limit
          </th>
          <td>
            {{ nftDetails.tokenLimit }}
          </td>
        </tr>
        <tr
          v-if="nftDetails.templateLimit !== null"
          class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
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
import AppPanel from '@/components/AppPanel'
import { nftsHints } from '@/utils/hints/nftsHints'

defineProps({
  nftDetails: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>
.nfts-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: 400px;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
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

    @media (--desktop) {
      gap: 0 var(--space-1);
    }
  }
}
</style>
