<template>
  <app-panel class="nft-details-panel">
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
          v-if="tokenLimit !== null"
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Token limit
            <hint-tooltip>
            <!--              {{ nftsHints.queryFormat }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ tokenLimit }}
          </td>
        </tr>
        <tr
          v-if="templateLimit !== null"
          class="nft-details-panel__row">
          <th class="nft-details-panel__table-header">
            Template limit
            <hint-tooltip>
            <!--              {{ nftsHints.responseFormat }}-->
            </hint-tooltip>
          </th>
          <td class="nft-details-panel__data">
            {{ templateLimit }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import AppPanel from '~/components/AppPanel'

const props = defineProps({
  nftDetails: {
    type: Object,
    required: true,
  },
})

// todo move
const tokenLimit = computed(() => {
  const extensions = props.nftDetails.extensions
  if (extensions.includes('mintable') && extensions.includes('mintable_limit')) {
    return props.nftDetails.limits.tokenLimit
  } else if (extensions.includes('mintable') && !extensions.includes('mintable_limit')) {
    return 'Unlimited'
  } else if (extensions.includes('mintable_templates') && extensions.includes('mintable_templates_limit')) {
    return null
  } else if (extensions.includes('mintable_templates') && !extensions.includes('mintable_templates_limit')) {
    return null
  }
})

const templateLimit = computed(() => {
  const extensions = props.nftDetails.extensions

  if (extensions.includes('mintable') && extensions.includes('mintable_limit')) {
    return null
  } else if (extensions.includes('mintable') || !extensions.includes('mintable_limit')) {
    return null
  } else if (extensions.includes('mintable_templates') && extensions.includes('mintable_templates_limit')) {
    return 'Unlimited'
  } else if (extensions.includes('mintable_templates') || !extensions.includes('mintable_templates_limit')) {
    return props.nftDetails.limits.templateLimit
  }
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

  &__extensions {
    /*todo fix in tokens*/
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    justify-content: flex-end;
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
