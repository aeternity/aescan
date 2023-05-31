<template>
  <app-tooltip>
    <slot/>

    <template #tooltip>
      Coming soon
    </template>
  </app-tooltip>
</template>

<script setup>
import AppTooltip from '@/components/AppTooltip'
</script>
