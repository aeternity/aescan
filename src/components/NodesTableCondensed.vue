<template>
  <div>
    <table
      v-for="(node, index) in nodes"
      :key="node.networkId"
      class="nodes-table-condensed__table">
      <tbody>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.nodeId }}
            </hint-tooltip>
            Node Id
          </th>
          <td class="nodes-table-condensed__data">
            {{ index }}
          </td>
        </tr>

        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.host }}
            </hint-tooltip>
            Host
          </th>
          <td class="nodes-table-condensed__data">
            {{ node.host }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.port }}
            </hint-tooltip>
            Port
          </th>
          <td class="nodes-table-condensed__data">
            {{ node.port }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.networkId }}
            </hint-tooltip>
            Network Id
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.networkId) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.nodeVersion }}
            </hint-tooltip>
            Version
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeVersion) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.nodeRevision }}
            </hint-tooltip>
            Revision
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeRevision) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.nodeVendor }}
            </hint-tooltip>
            Vendor
          </th>
          <td class="nodes-table-condensed__data">
            {{ formatNullable(node.nodeVendor) }}
          </td>
        </tr>
        <tr class="nodes-table-condensed__row">
          <th class="nodes-table-condensed__header">
            <hint-tooltip>
              {{ nodesHints.os }}
            </hint-tooltip>
            OS
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
import { nodesHints } from '@/utils/hints/nodesHints'

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
