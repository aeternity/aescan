<template>
  <app-panel>
    <nodes-table
      :nodes="nodes"
      class="u-hidden-mobile"/>
    <nodes-table-condensed
      :nodes="nodes"
      class="u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNodes } from '@/stores/nodes'

const nodesStore = useNodes()
const { fetchNodes } = nodesStore
const { nodes } = storeToRefs(nodesStore)

await fetchNodes()

</script>
