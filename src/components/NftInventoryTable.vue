<template>
  <table>
    <thead>
      <tr>
        <th>Template ID</th>
        <th>Supply</th>
        <th>Limit</th>
        <th>Create Transaction</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(nft, index) in nftInventory.data"
        :key="nft.templateId ">
        <tr>
          <td :class="[{'nft-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.templateId }}
          </td>
          <td :class="[{'nft-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.edition.supply }}
          </td>
          <td :class="[{'nft-inventory-table__data--expanded': isOpened.includes(index)}]">
            {{ nft.edition.limit }}
          </td>
          <td :class="[{'nft-inventory-table__data--expanded': isOpened.includes(index)}]">
            <app-link :to="`/transactions/${nft.edition.limitTxHash}`">
              {{ nft.edition.limitTxHash }}
            </app-link>
          </td>
          <td :class="[{'nft-inventory-table__data--expanded': isOpened.includes(index)}]">
            <response-button
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)"/>
          </td>
        </tr>
        <tr v-if="isOpened.includes(index)">
          <td
            colspan="5"
            class="nft-inventory-table__query">
            AAAA
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script setup>

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
.nft-inventory-table {
  &__data--expanded {
    border-bottom: 0;
  }

  &__query {
    /*todo classname*/
    border-top: 0;
  }
}
</style>
