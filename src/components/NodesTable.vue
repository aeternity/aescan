<template>
  <div class="nodes-table__container">
    <table>
      <thead>
        <tr>
          <th class="nodes-table__header">
            Node Id
            <hint-tooltip>
              {{ nodesHints.nodeId }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Host
            <hint-tooltip>
              {{ nodesHints.host }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Port
            <hint-tooltip>
              {{ nodesHints.port }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Network Id
            <hint-tooltip>
              {{ nodesHints.networkId }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Version
            <hint-tooltip>
              {{ nodesHints.nodeVersion }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Revision
            <hint-tooltip>
              {{ nodesHints.nodeRevision }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            Vendor
            <hint-tooltip>
              {{ nodesHints.nodeVendor }}
            </hint-tooltip>
          </th>
          <th class="nodes-table__header">
            OS
            <hint-tooltip>
              {{ nodesHints.os }}
            </hint-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(node, index) in nodes"
          :key="node.networkId">
          <td class="nodes-table__hash">
            <value-hash-ellipsed :hash="index"/>
          </td>
          <td class="nodes-table__data">
            {{ node.host }}
          </td>
          <td class="nodes-table__data">
            {{ node.port }}
          </td>
          <td class="nodes-table__data">
            {{ formatNullable(node.networkId) }}
          </td>
          <td class="nodes-table__data">
            {{ formatNullable(node.nodeVersion) }}
          </td>
          <td class="nodes-table__data">
            <value-hash-ellipsed
              v-if="node.nodeRevision"
              :hash="node.nodeRevision"/>
            <template v-else>
              N/A
            </template>
          </td>
          <td class="nodes-table__data">
            {{ formatNullable(node.nodeVendor) }}
          </td>
          <td class="nodes-table__data">
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
.nodes-table {
  &__header {
    white-space: nowrap;
  }

  &__data {
    white-space: nowrap;
  }

  &__container {
    overflow-x: auto;
  }
}
</style>
