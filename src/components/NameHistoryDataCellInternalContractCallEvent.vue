<template>
  {{ payload.function }}
</template>

<script setup>

defineProps({
  payload: {
    type: Object,
    required: true,
  },
})

</script>
