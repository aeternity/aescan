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
const { fetchNodes } = useNodes()
const { nodes } = storeToRefs(useNodes())

await fetchNodes()
</script>
