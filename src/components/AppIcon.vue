<template>
  <component
    :is="icon"
    :height="size"
    :width="size"
    class="icon"/>
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      icon: null,
    }
  },
  watch: {
    name: {
      immediate: true,
      async handler() {
        this.icon = await import(`@/assets/icons/${this.name}.svg`)
      },
    },
  },
}
</script>

<style>
.icon {
  fill: currentColor;

  & *[stroke] {
    stroke: currentColor;
  }
}
</style>
