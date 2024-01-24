<template>
  <input
    :value="modelValue"
    v-bind="{...attributes}"
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
</script>
