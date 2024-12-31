<template>
  <div>
    <scope-picker
      v-model="selectedScope"
      :is-scope-selected="!!selectedScope"
      placeholder="All Time"
      :clearable="true"
      type="t"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])

const selectedScope = useVModel(props, 'modelValue', emit)
</script>
