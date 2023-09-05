<template>
  <div>
    <table
      v-for="owner in owners.data"
      :key="owner.tokenId"
      class="nft-owners-table-condensed__table">
      <tbody>
        <tr class="nft-owners-table-condensed__row">
          <th class="nft-owners-table-condensed__header">
            <app-tooltip>
              Token ID
              <template #tooltip>
                {{ nftsHints.ownersTokenId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nft-owners-table-condensed__data">
            {{ owner.tokenId }}
          </td>
        </tr>
        <tr class="nft-owners-table-condensed__row">
          <th class="nft-owners-table-condensed__header">
            <app-tooltip>
              Smart Contract ID
              <template #tooltip>
                {{ nftsHints.ownersContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nft-owners-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/contracts/${owner.contractId}`"
              :hash="owner.contractId "/>
          </td>
        </tr>
        <tr class="nft-owners-table-condensed__row">
          <th class="nft-owners-table-condensed__header">
            <app-tooltip>
              Owner ID
              <template #tooltip>
                {{ nftsHints.ownersOwnerId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nft-owners-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/accounts/${owner.ownerId}`"
              :hash="owner.ownerId "/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { nftsHints } from '@/utils/hints/nftHints'
import AppTooltip from '@/components/AppTooltip'

defineProps({
  owners: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>
.nft-owners-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    font-family: var(--font-primary);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.05em;
  }
}
</style>
