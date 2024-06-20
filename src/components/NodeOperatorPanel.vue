<template>
  <app-panel>
    <table>
      <tr>
        <th>Node Id</th>
        <th>Host</th>
        <th>Port</th>
        <th>Network Id</th>
        <th>Node version</th>
        <th>node revision</th>
        <th>node vendor</th>
        <th>OS</th>
      </tr>
      <tr
        v-for="node in nodeOperators"
        :key="node.genesisHash">
        <td>{{ }}</td>
        <td>{{ node.host }}</td>
        <td>{{ node.port }}</td>
        <td>{{ node.networkId }}</td>
        <td>{{ node.nodeVersion }}</td>
        <td>{{ node.nodeRevision }}</td>
        <td>{{ node.nodeVendor }}</td>
        <td>{{ node.nodeOs }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNodeOperators } from '~/stores/nodeOperators'

const nodeOperatorsStore = useNodeOperators()
const { fetchNodeOperators } = nodeOperatorsStore
const { nodeOperators } = storeToRefs(nodeOperatorsStore)

await fetchNodeOperators()

</script>
