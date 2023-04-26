<template>
  <div>{{ events }}</div>
</template>
<script setup>
defineProps({
  events: {
    type: Array,
    required: true,
  },
})
</script>
