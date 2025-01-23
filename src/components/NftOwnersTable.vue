<template>
  <table>
    <thead>
      <tr>
        <th class="nft-owners-table__header">
          Token ID
          <hint-tooltip>
            {{ nftsHints.ownersTokenId }}
          </hint-tooltip>
        </th>
        <th class="nft-owners-table__header">
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
        <td class="nft-owners-table__data">
          {{ owner.tokenId }}
        </td>
        <td class="nft-owners-table__data">
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
