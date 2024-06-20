<template>
  <app-panel>
    <node-operators-table
      :node-operators="nodeOperators"
      class="u-hidden-mobile"/>
    <node-operators-table-condensed
      :node-operators="nodeOperators"
      class="u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNodeOperators } from '@/stores/nodeOperators'

const nodeOperatorsStore = useNodeOperators()
const { fetchNodeOperators } = nodeOperatorsStore
const { nodeOperators } = storeToRefs(nodeOperatorsStore)

await fetchNodeOperators()

</script>
