<template>
  <!--  todo markup-->
  <table>
    <tr>
      <th class="nft-owners-table__header">
        Token ID
      </th>
      <th class="nft-owners-table__header">
        Contract ID
      </th>
      <th class="nft-owners-table__header">
        Owner ID
      </th>
    </tr>
    <tr
      v-for="owner in owners.data"
      :key="owner.tokenId">
      <td class="nft-owners-table__data">
        {{ owner.tokenId }}
      </td>
      <td class="nft-owners-table__data">
        <app-link :to="`/contracts/${owner.contractId}`">
          {{ owner.contractId }}
        </app-link>
      </td>
      <td class="nft-owners-table__data">
        <app-link :to="`/accounts/${owner.ownerId}`">
          {{ owner.ownerId }}
        </app-link>
      </td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  owners: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.nft-owners-table {
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
