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
      v-for="node in nodeOperators"
      :key="node.networkId">
      <td>
        <value-hash-ellipsed
          :hash="node.genesisHash"
          :link-to="`/keyblocks/${node.genesisHash}`"/>
      </td>
      <td>
        {{ node.host }}
      </td>
      <td>{{ node.port }}</td>
      <td>{{ node.networkId }}</td>
      <td>{{ node.nodeVersion }}</td>
      <td>{{ node.nodeRevision }}</td>
      <td>{{ node.nodeVendor }}</td>
      <td>{{ node.nodeOs }}</td>
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
