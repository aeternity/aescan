<template>
  <table>
    <tr>
      <th>Node Id</th>
      <th>Host</th>
      <th>Port</th>
      <th>Network Id</th>
      <th>Node Version</th>
      <th>Node Revision</th>
      <th>Node Vendor</th>
      <th>OS</th>
    </tr>
    <tr
      v-for="(node, index) in nodeOperators"
      :key="node.networkId">
      <td class="node-operators-table__hash">
        {{ index }}
      </td>
      <td>
        {{ node.host }}
      </td>
      <td>{{ node.port }}</td>
      <td>{{ formatNullable(node.networkId) }}</td>
      <td>{{ formatNullable(node.nodeVersion) }}</td>
      <td class="node-operators-table__hash">
        {{ formatNullable(node.nodeRevision) }}
      </td>
      <td>{{ formatNullable(node.nodeVendor) }}</td>
      <td>{{ formatNullable(node.nodeOs) }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  nodeOperators: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.node-operators-table__hash {
  word-break: break-all;
}
</style>
