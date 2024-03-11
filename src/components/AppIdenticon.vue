<template>
  <img
    :src="`https://avatars.z52da5wt.xyz/${hash}`"
    class="identicon">
</template>

<script setup>
defineProps({
  hash: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.identicon {
  display: inline-block;
  border-radius: 50%;
}
</style>
