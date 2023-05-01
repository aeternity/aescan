<template>
  <div
    v-show="isActive"
    class="tab">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isActive = ref(false)
const registerTab = inject('registerTab')

registerTab({
  title: props.title,
  isActive,
})
</script>
