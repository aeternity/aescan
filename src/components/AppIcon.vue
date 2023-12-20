<template>
  <component
    :is="icon"
    :height="size"
    :width="size"
    class="icon"/>
</template>

<script setup>
const icon = ref(null)
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16,
  },
})

watch(
  computed(() => props.name),
  async() => { icon.value = await import(`@/assets/icons/${props.name}.svg`) },
  { immediate: true },
)
</script>

<style>
.icon {
  fill: currentcolor;

  & *[stroke] {
    stroke: currentcolor;
  }
}
</style>
