<template>
  <app-panel class="nfts-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <copy-chip
        :label="nftDetails.contractId"
        class="u-hidden-mobile"/>
      <copy-chip
        :label="formatEllipseHash(nftDetails.contractId)"
        :clipboard-text="nftDetails.contractId"
        class="u-hidden-desktop"/>
    </template>

    <table>
      <tbody>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            Collection Name
            <hint-tooltip>
              {{ nftsHints.collectionName }}
            </hint-tooltip>
          </th>
          <td class="nfts-details-panel__data">
            {{ nftDetails.name }}
          </td>
        </tr>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            Owners
            <hint-tooltip>
              {{ nftsHints.owners }}
            </hint-tooltip>
          </th>
          <td class="nfts-details-panel__data">
            {{ nftDetails.nftOwners }}
          </td>
        </tr>
        <tr class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            Amount
            <hint-tooltip>
              {{ nftsHints.amount }}
            </hint-tooltip>
          </th>
          <td class="nfts-details-panel__data">
            {{ nftDetails.nftsAmount }}
          </td>
        </tr>
        <tr
          class="nfts-details-panel__row">
          <th class="nfts-details-panel__table-header">
            Extensions
            <hint-tooltip>
              {{ nftsHints.extensions }}
            </hint-tooltip>
          </th>
          <td class="nfts-details-panel__data">
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
            Token limit
            <hint-tooltip>
              {{ nftsHints.tokenLimit }}
            </hint-tooltip>
          </th>
          <td class="nfts-details-panel__data">
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
          <td class="nfts-details-panel__data">
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
  }

  &__data {
    text-align: right;
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
    justify-content: flex-end;
  }
}
</style>
