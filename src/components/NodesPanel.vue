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

const nodesStore = useNodes()
const { fetchNodes } = nodesStore
const { nodes } = storeToRefs(nodesStore)

await fetchNodes()
</script>
