<template>
  <div>
    <scope-picker
      :selected-scope="selectedScope"
      :is-scope-selected="!!selectedScope"
      placeholder="All Time"
      :clearable="true"
      type="t"
      @updated="selectedScope = $event"/>
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

const selectedScope = useVModel(props, 'modelValue', null)
</script>
