<template>
  <div class="hash-symbol">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'HashSymbol',
}
</script>

<style scoped>
.hash-symbol {
  display: inline-flex;
  width: 24px;
  height: 24px;
  margin-right: var(--space-1);
  align-items: center;
  justify-content: center;
  color: var(--color-fire);
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: -0.07em;
}
</style>
