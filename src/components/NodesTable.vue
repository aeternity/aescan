<template>
  <table class="nodes-table">
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
        <td>{{ node.host }}</td>
        <td>{{ node.port }}</td>
        <td>{{ formatNullable(node.networkId) }}</td>
        <td>{{ formatNullable(node.nodeVersion) }}</td>
        <td>
          <value-hash-ellipsed
            v-if="node.nodeRevision"
            :hash="node.nodeRevision"/>
          <template v-else>
            ---
          </template>
        </td>
        <td>{{ formatNullable(node.nodeVendor) }}</td>
        <td>{{ formatNullable(node.nodeOs) }}</td>
      </tr>
    </tbody>
  </table>
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
}
</style>
