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
              <!--              {{ oraclesHints.queryTx }}-->
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
              Contract ID
              <template #tooltip>
              <!--              {{ oraclesHints.queryTx }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-owners-table-condensed__data">
            <app-link :to="`/contracts/${owner.contractId}`">
              {{ owner.contractId }}
            </app-link>
          </td>
        </tr>
        <tr class="nft-owners-table-condensed__row">
          <th class="nft-owners-table-condensed__header">
            <app-tooltip>
              Owner ID
              <template #tooltip>
              <!--              {{ oraclesHints.queryStatus }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-owners-table-condensed__data">
            <app-link :to="`/accounts/${owner.ownerId}`">
              {{ owner.ownerId }}
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import AppTooltip from '~/components/AppTooltip'

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
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
