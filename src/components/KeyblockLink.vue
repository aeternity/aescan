<template>
  <app-link
    :to="`/keyblocks/${height}`">
    {{ height }}
  </app-link>
</template>

<script setup>
defineProps({
  height: {
    type: Number,
    required: true,
  },
})
</script>
