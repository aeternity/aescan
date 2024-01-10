<template>
  <div
    v-if="node.webkitRelativePath"
    class="label">
    {{ node.webkitRelativePath }}
  </div>
  <contracts-file-list
    v-for="(child, index) in node.subfolder"
    :key="index"
    :node="child"/>
</template>

<script>
export default {
  name: 'Node',
  props: {
    node: Object,
  },
}
</script>
