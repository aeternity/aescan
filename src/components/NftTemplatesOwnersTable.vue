<template>
  <table>
    <thead>
      <tr>
        <th class="nft-templates-owners-table__header">
          Token ID
          <hint-tooltip>
            {{ nftsHints.ownersTokenId }}
          </hint-tooltip>
        </th>
        <th class="nft-templates-owners-table__header">
          Smart Contract ID
          <hint-tooltip>
            {{ nftsHints.ownersContractId }}
          </hint-tooltip>
        </th>
        <th class="nft-templates-owners-table__header">
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
        <td class="nft-templates-owners-table__data">
          {{ owner.tokenId }}
        </td>
        <td class="nft-templates-owners-table__data">
          <value-hash-ellipsed
            :link-to="`/contracts/${owner.contractId}`"
            :hash="owner.contractId "/>
        </td>
        <td class="nft-templates-owners-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${owner.ownerId}`"
            :hash="owner.ownerId "/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

defineProps({
  owners: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.nft-templates-owners-table {
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
