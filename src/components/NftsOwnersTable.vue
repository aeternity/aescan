<template>
  <table>
    <thead>
      <tr>
        <th class="nfts-owners-table__header">
          Token ID
          <hint-tooltip>
            {{ nftsHints.ownersTokenId }}
          </hint-tooltip>
        </th>
        <th class="nfts-owners-table__header">
          Owner ID
          <hint-tooltip>
            {{ nftsHints.ownersOwnerId }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="owner in owners.data"
        :key="owner.tokenId">
        <td class="nfts-owners-table__data">
          {{ owner.tokenId }}
        </td>
        <td class="nfts-owners-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${owner.ownerId}`"
            :hash="owner.ownerId "/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftHints'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  owners: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.nfts-owners-table {
  &__header {
    font-family: var(--font-primary);
  }

  &__data {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.05em;
  }
}
</style>
