<template>
  <table/>
  {{ microblocks }}
</template>
<script setup>
defineProps({
  microblocks: {
    type: Object,
    required: true,
  },
})
</script>
