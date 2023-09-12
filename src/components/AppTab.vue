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
  isPreselected: {
    type: Boolean,
    default: false,
  },
})

const isActive = ref(false)
const registerTab = inject('registerTab')

registerTab({
  title: props.title,
  isPreselected: props.isPreselected,
  isActive,
})
</script>
