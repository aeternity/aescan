<template>
  <div class="panel">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppPanel',
}
</script>

<style scoped>
.panel {
  max-width: 100%;
  background: var(--color-white);
  border-radius: 8px;
}
</style>
