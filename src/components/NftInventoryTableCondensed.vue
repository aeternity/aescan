<template>
  <div>
    <table
      v-for="(nft, index) in nftInventory.data"
      :key="nft.templateId"
      class="nft-inventory-table-condensed__table">
      <tbody>
        <tr class="nft-inventory-table-condensed__row">
          <th class="nft-inventory-table-condensed__header">
            <app-tooltip>
              Template ID
              <template #tooltip>
              <!--              {{ oraclesHints.queryTx }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-inventory-table-condensed__data">
            {{ nft.templateId }}
          </td>
        </tr>
        <tr class="nft-inventory-table-condensed__row">
          <th class="nft-inventory-table-condensed__header">
            <app-tooltip>
              Supply
              <template #tooltip>
              <!--              {{ oraclesHints.queryTx }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-inventory-table-condensed__data">
            {{ nft.edition.supply }}
          </td>
        </tr>
        <tr class="nft-inventory-table-condensed__row">
          <th class="nft-inventory-table-condensed__header">
            <app-tooltip>
              Limit
              <template #tooltip>
              <!--              {{ oraclesHints.queryStatus }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-inventory-table-condensed__data">
            {{ nft.edition.limit }}
          </td>
        </tr>
        <tr class="nft-inventory-table-condensed__row">
          <th class="nft-inventory-table-condensed__header">
            <app-tooltip>
              Create Transaction
              <template #tooltip>
              <!--              {{ oraclesHints.queryStatus }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-inventory-table-condensed__data">
            <app-link :to="`/transactions/${nft.edition.limitTxHash}`">
              {{ nft.edition.limitTxHash }}
            </app-link>
          </td>
        </tr>
        <tr class="nft-inventory-table-condensed__row">
          <th
            :class="[
              'nft-inventory-table-condensed__header',
              {'nft-inventory-table-condensed__header--expanded': isOpened.includes(index)}]">
            <app-tooltip>
              Respond Tx
              <template #tooltip>
              <!--              {{ oraclesHints.respondTx }}-->
              </template>
            </app-tooltip>
          </th>
          <td
            :class="[
              'nft-inventory-table-condensed__data',
              {'nft-inventory-table-condensed__data--expanded': isOpened.includes(index)}]">
          <!--            <value-hash-ellipsed-->
          <!--              :hash="event.respondTx"-->
          <!--              :link-to="`/transactions/${event.respondTx}`"/>-->
          </td>
        </tr>
        <tr class="nft-inventory-table-condensed__row">
          <th class="nft-inventory-table-condensed__header">
            <app-tooltip>
              Status
              <template #tooltip>
              <!--                {{ oraclesHints.queryStatus }}-->
              </template>
            </app-tooltip>
          </th>
          <td class="nft-inventory-table-condensed__data">
            <response-button
              :is-collapsed="!isOpened.includes(index)"
              @click="toggle(index)"/>
          </td>
        </tr>
        <tr
          v-if="isOpened.includes(index)"
          class="nft-inventory-table-condensed__row">
          <td colspan="5">
            <nft-owners-panel :contract-id="nft.contractId"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import AppTooltip from '~/components/AppTooltip'

const props = defineProps({
  nftInventory: {
    type: Object,
    required: true,
  },
})

const isOpened = ref([])

watch(() => props.nftInventory, () => {
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
.nft-inventory-table-condensed {
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
