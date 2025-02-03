<template>
  <app-panel>
    <nodes-table :nodes="nodes"/>
  </app-panel>
</template>

<script setup>
const { fetchNodes } = useNodes()
const { nodes } = storeToRefs(useNodes())

await fetchNodes()
</script>
