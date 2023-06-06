<template>
  <app-icon
    name="question"
    :size="16"
    class="hint-icon"/>
</template>
<script setup>
import AppIcon from '@/components/AppIcon'
</script>

<style scoped>
.hint-icon {
  margin-bottom: 2px;
  color: var(--color-midnight-25);
  cursor: help;
}
</style>
