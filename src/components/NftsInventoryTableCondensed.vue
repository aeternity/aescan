<template>
  <div>
    <table
      v-for="(nft, index) in nftInventory.data"
      :key="nft.templateId"
      class="nfts-inventory-table-condensed__table">
      <tbody>
        <tr class="nfts-inventory-table-condensed__row">
          <th class="nfts-inventory-table-condensed__header">
            <hint-tooltip>
              {{ nftsHints.inventoryTemplateId }}
            </hint-tooltip>

            Template ID
          </th>
          <td class="nfts-inventory-table-condensed__data">
            {{ nft.templateId }}
          </td>
        </tr>
        <tr class="nfts-inventory-table-condensed__row">
          <th class="nfts-inventory-table-condensed__header">
            <hint-tooltip>
              {{ nftsHints.inventorySupply }}
            </hint-tooltip>
            Supply
          </th>
          <td class="nfts-inventory-table-condensed__data">
            {{ nft.edition?.supply }}
          </td>
        </tr>
        <tr class="nfts-inventory-table-condensed__row">
          <th class="nfts-inventory-table-condensed__header">
            <hint-tooltip>
              {{ nftsHints.inventoryLimit }}
            </hint-tooltip>
            Limit
          </th>
          <td class="nfts-inventory-table-condensed__data">
            {{ nft.edition?.limit }}
          </td>
        </tr>

        <tr class="nfts-inventory-table-condensed__row">
          <th class="nfts-inventory-table-condensed__header">
            \
            <hint-tooltip>
              {{ nftsHints.inventoryCreteTransaction }}
            </hint-tooltip>
            Create Transaction
          </th>
          <td class="nfts-inventory-table-condensed__data">
            <value-hash-ellipsed
              v-if="nft?.txHash"
              :link-to="`/transactions/${nft.txHash}`"
              :hash="nft.txHash"/>
          </td>
        </tr>

        <tr
          v-if="!!nftOwners.data.length"
          class="nfts-inventory-table-condensed__row">
          <th/>
          <td class="nfts-inventory-table-condensed__data">
            <expand-button
              :is-expanded="isExpanded.includes(index)"
              @click="toggle(index)">
              {{ isExpanded.includes(index) ? 'Collapse' : 'Expand' }}
            </expand-button>
          </td>
        </tr>
        <tr
          v-if="isExpanded.includes(index)"
          class="nfts-inventory-table-condensed__row">
          <td colspan="2">
            <nfts-templates-owners-panel/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { nftsHints } from '@/utils/hints/nftsHints'

const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)

const props = defineProps({
  nftInventory: {
    type: Object,
    required: true,
  },
})

const isExpanded = ref([])

watch(() => props.nftInventory, () => {
  isExpanded.value = []
})

function toggle(id) {
  const index = isExpanded.value.indexOf(id)
  if (index > -1) {
    isExpanded.value.splice(index, 1)
  } else {
    isExpanded.value.push(id)
  }
}
</script>

<style scoped>
.nfts-inventory-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);

    &--expanded {
      border-bottom: 0;
    }
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;

    &--expanded {
      border-bottom: 0;
    }
  }
}
</style>
