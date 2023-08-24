<template>
  <app-panel v-if="nfts && nftsCount">
    <table>
      <tr>
        <th>Collection Name</th>
        <th>Owners</th>
        <th>Amount</th>
        <th>Smart Contract ID</th>
      </tr>
      <tr v-for="nft in nfts.data">
        <td>{{ nft.name }}</td>
        <td>{{ nft.nftOwners }}</td>
        <td>{{ nft.nftsAmount }}</td>
        <td>{{ nft.contractId }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNftsStore } from '~/stores/nfts'

const nftsStore = useNftsStore()
const {
  nfts,
  nftsCount,
} = storeToRefs(nftsStore)
const { fetchNfts, fetchNftsCount } = nftsStore

await fetchNftsCount()
await fetchNfts()
</script>
