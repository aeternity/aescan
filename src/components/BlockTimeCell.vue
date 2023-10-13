<template>
  <div>
    <app-link
      :to="`/keyblocks/${height}`">
      {{ height }}
    </app-link>
  </div>
  <datetime-label :datetime="datetime"/>
</template>

<script setup>
defineProps({
  height: {
    type: String,
    required: true,
  },
  datetime: {
    type: Object,
    required: true,
  },
})

</script>
