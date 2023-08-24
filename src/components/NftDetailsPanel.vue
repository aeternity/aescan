<template>
  <app-panel class="nft-details-panel">
    {{ nftDetails }}
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <copy-chip
        :label="nftDetails.contractId"
        class="nft-details-panel__chip"/>
      <copy-chip
        :label="formatEllipseHash(nftDetails.contractId)"
        :clipboard-text="nftDetails.contractId"
        class="nft-details-panel__chip-ellipse"/>
    </template>

    <table>
      <tbody>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Collection name
            <hint-tooltip>
            <!--                          {{ nftsHints.lastExtended }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.name }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Owners
            <hint-tooltip>
            <!--              {{ nftsHints.lastQueried }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.nftOwners }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Amount
            <hint-tooltip>
            <!--              {{ nftsHints.expiration }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.nftsAmount }}
          </td>
        </tr>
        <tr
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Extensions
            <hint-tooltip>
            <!--              {{ nftsHints.queryFee }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.extensions }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Token limit
            <hint-tooltip>
            <!--              {{ nftsHints.queryFormat }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ nftDetails.limits }}
          </td>
        </tr>
        <tr class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Template limit
            <hint-tooltip>
            <!--              {{ nftsHints.responseFormat }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            ???
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import AppPanel from '~/components/AppPanel'

defineProps({
  nftDetails: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>
.nft-details-panel {
  /*todo styles revision*/

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

  &__chip,
  &__hash {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__chip-ellipse,
  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
