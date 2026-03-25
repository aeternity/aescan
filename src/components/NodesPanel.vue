<template>
  <app-panel>
    <nodes-table
      v-if="nodes"
      :nodes="nodes"/>
  </app-panel>
</template>

<script setup>
const { fetchNodes } = useNodes()
const { nodes } = storeToRefs(useNodes())

fetchNodes()
</script>
