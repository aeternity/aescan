<template>
  <span>
    UPDATED DATA
  </span>
</template>

<script setup>
defineProps({
  payload: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

</script>
