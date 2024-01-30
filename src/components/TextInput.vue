<template>
  <input
    :value="modelValue"
    v-bind="{...attributes}"
    class="text-input"
    @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  attributes: {
    type: Object,
    default: null,
  },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.text-input {
  min-height: 40px;
  padding: var(--space-1);
}
</style>
