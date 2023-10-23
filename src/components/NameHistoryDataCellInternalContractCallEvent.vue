<template>
  <app-chip size="sm">
    {{ payload.function }}
  </app-chip>
</template>

<script setup>

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})

</script>
