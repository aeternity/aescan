<template>
  <span>
    UPDATED DATA
  </span>
</template>

<script setup>
const props = defineProps({
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
