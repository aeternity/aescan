<template>
  <table>
    <tr>
      <th>Template ID</th>
      <th>Supply</th>
      <th>Limit</th>
      <th>Create Transaction</th>
    </tr>
    <tr
      v-for="nft in nftInventory.data"
      :key="nft.templateId">
      <td>{{ nft.templateId }}</td>
      <td>{{ nft.edition.supply }}</td>
      <td>{{ nft.edition.limit }}</td>
      <td>
        <app-link :to="`/transactions/${nft.edition.limitTxHash}`">
          {{ nft.edition.limitTxHash }}
        </app-link>
      </td>
      <td>
        <!--            <response-button-->
        <!--                :is-collapsed="!isOpened.includes(index)"-->
        <!--                @click="toggle(index)"/>-->
      </td>
    </tr>
  </table>
</template>
<script setup>

const props = defineProps({
  nftInventory: {
    type: Object,
    required: true,
  },
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
