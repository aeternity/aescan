<template>
  <app-icon
    name="question"
    :size="19"
    class="hint-icon"/>
</template>
<script setup>
import AppIcon from '@/components/AppIcon'
</script>

<style scoped>
.hint-icon {
  color: var(--color-error);
  cursor: help;
}
</style>
