<template>
  <div>
    <table
      v-for="(node, index) in nodes"
      :key="node.networkId"
      class="nodes-table-condensed__table">
      <tbody>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Node Id
              <template #tooltip>
                {{ tokensHints.tokenSymbol }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ index }}
          </td>
        </tr>

        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Host
              <template #tooltip>
                {{ tokensHints.tokenName }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ node.host }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Port
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ node.port }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Network Id
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.networkId) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Node Version
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeVersion) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Node Revision
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeRevision) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              Node Vendor
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeVendor) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <app-tooltip>
              OS
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeOs) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { tokensHints } from '~/utils/hints/tokensHints'

defineProps({
  nodes: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.nodes-table-condensed {
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
