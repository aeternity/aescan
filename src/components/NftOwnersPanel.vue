<template>
  <!--  todo shorten name-->
  <app-panel class="nft-inventory-panel">
    <table>
      <tr>
        <th>
          Token ID
        </th>
        <th>
          Contract ID
        </th>
        <th>
          Owner ID
        </th>
      </tr>
      <tr v-for="owner in nftOwners.data">
        <td>
          {{ owner.tokenId }}
        </td>
        <td>
          <app-link :to="`/contracts/${owner.contractId}`">
            {{ owner.contractId }}
          </app-link>
        </td>
        <td>
          <app-link :to="`/accounts/${owner.ownerId}`">
            {{ owner.ownerId }}
          </app-link>
        </td>
      </tr>
    </table>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useNftDetailsStore } from '~/stores/nftDetails'

const props = defineProps({
  contractId: {
    type: String,
    required: true,
  },
})

const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)
const { fetchNftOwners } = nftDetailsStore

fetchNftOwners({
  contractId: props.contractId,
})
</script>

<style scoped>
.nft-inventory-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

  &__heading {
    font-weight: 700;
    letter-spacing: 0.015em;
    margin-bottom: var(--space-3);
  }

  &__term {
    height: 16px;
  }

  &__description {
    word-break: break-all;
  }
}
</style>
