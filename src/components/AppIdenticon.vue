<template>
  <canvas
    ref="identicon"
    class="app-identicon"/>
</template>

<script setup>
import { renderIcon } from '@download/blockies'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(render)

const identicon = ref()

function render() {
  renderIcon(
    { seed: props.id },
    identicon.value,
  )
}
</script>

<style scoped>
.app-identicon {
  display: inline-block;
  border-radius: 50%;
}
</style>
