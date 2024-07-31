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
                {{ nodesHints.nodeId }}
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
                {{ nodesHints.host }}
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
                {{ nodesHints.port }}
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
                {{ nodesHints.networkId }}
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
              Version
              <template #tooltip>
                {{ nodesHints.nodeVersion }}
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
              Revision
              <template #tooltip>
                {{ nodesHints.nodeRevision }}
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
              Vendor
              <template #tooltip>
                {{ nodesHints.nodeVendor }}
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
                {{ nodesHints.os }}
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
import { nodesHints } from '../utils/hints/nodesHints'

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
    word-break: break-all;
  }
}
</style>
