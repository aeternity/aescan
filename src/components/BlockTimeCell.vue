<template>
  <div>
    <app-link
      :to="`/keyblocks/${height}`">
      {{ height }}
    </app-link>
  </div>
  <timestamp-label :timestamp="timestamp"/>
</template>

<script setup>
defineProps({
  height: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Object,
    required: true,
  },
})

</script>
