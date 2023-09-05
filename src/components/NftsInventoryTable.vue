<template>
  <table>
    <thead>
      <tr>
        <th>
          Template ID
          <hint-tooltip>
            {{ nftsHints.inventoryTemplateId }}
          </hint-tooltip>
        </th>
        <th>
          Supply
          <hint-tooltip>
            {{ nftsHints.inventorySupply }}
          </hint-tooltip>
        </th>
        <th>
          Limit
          <hint-tooltip>
            {{ nftsHints.inventoryLimit }}
          </hint-tooltip>
        </th>
        <th>
          Create Transaction
          <hint-tooltip>
            {{ nftsHints.inventoryCreteTransaction }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(nft, index) in nftInventory.data"
        :key="nft.templateId ">
        <tr>
          <td :class="[{'nfts-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.templateId }}
          </td>
          <td :class="[{'nfts-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.edition.supply }}
          </td>
          <td :class="[{'nfts-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.edition.limit }}
          </td>
          <td :class="[{'nfts-inventory-table__data--expanded': isOpened.includes(index)}]">
            <value-hash-ellipsed
              :link-to="`/transactions/${nft.edition.limitTxHash}`"
              :hash="nft.edition.limitTxHash"/>
          </td>
          <td :class="[{'nfts-inventory-table__data--expanded': isOpened.includes(index)}]">
            <expand-button
              v-if="!!nftOwners.data.length"
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)">
              {{ isOpened.includes(index) ? 'Collapse' : 'Expand' }}
            </expand-button>
          </td>
        </tr>
        <tr v-if="isOpened.includes(index)">
          <td
            colspan="5"
            class="nfts-inventory-table__owners">
            <nfts-templates-owners-panel/>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { nftsHints } from '@/utils/hints/nftHints'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { useNftDetailsStore } from '~/stores/nftDetails'

const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)

const props = defineProps({
  nftInventory: {
    type: Object,
    required: true,
  },
})

const isOpened = ref([])

watch(() => props.oracleEvents, () => {
  isOpened.value = []
})

function toggle(id) {
  const index = isOpened.value.indexOf(id)
  if (index > -1) {
    isOpened.value.splice(index, 1)
  } else {
    isOpened.value.push(id)
  }
}
</script>

<style scoped>
.nfts-inventory-table {
  &__data--expanded {
    border-bottom: 0;
  }

  &__owners {
    border-top: 0;
  }
}
</style>
