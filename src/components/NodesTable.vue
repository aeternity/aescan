<template>
  <table class="nodes-table">
    <tr>
      <th>
        Node Id
        <hint-tooltip>
          {{ nodesHints.nodeId }}
        </hint-tooltip>
      </th>
      <th>
        Host
        <hint-tooltip>
          {{ nodesHints.host }}
        </hint-tooltip>
      </th>
      <th>
        Port
        <hint-tooltip>
          {{ nodesHints.port }}
        </hint-tooltip>
      </th>
      <th>
        Network Id
        <hint-tooltip>
          {{ nodesHints.networkId }}
        </hint-tooltip>
      </th>
      <th>
        Node Version
        <hint-tooltip>
          {{ nodesHints.nodeVersion }}
        </hint-tooltip>
      </th>
      <th>
        Node Revision
        <hint-tooltip>
          {{ nodesHints.nodeRevision }}
        </hint-tooltip>
      </th>
      <th>
        Node Vendor
        <hint-tooltip>
          {{ nodesHints.nodeVendor }}
        </hint-tooltip>
      </th>
      <th>
        OS
        <hint-tooltip>
          {{ nodesHints.os }}
        </hint-tooltip>
      </th>
    </tr>
    <tr
      v-for="(node, index) in nodes"
      :key="node.networkId">
      <td class="nodes-table__hash">
        {{ index }}
      </td>
      <td>
        {{ node.host }}
      </td>
      <td>{{ node.port }}</td>
      <td>{{ formatNullable(node.networkId) }}</td>
      <td>{{ formatNullable(node.nodeVersion) }}</td>
      <td class="nodes-table__hash">
        {{ formatNullable(node.nodeRevision) }}
      </td>
      <td>{{ formatNullable(node.nodeVendor) }}</td>
      <td>{{ formatNullable(node.nodeOs) }}</td>
    </tr>
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
.nodes-table__hash {
  word-break: break-all;
}
</style>
