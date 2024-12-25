<template>
  <div>
    <scope-picker
      :selected-scope="scope"
      :is-scope-selected="!!scope"
      placeholder="All Time"
      :clearable="true"
      type="t"
      @updated="scope = $event"/>
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
// todo try using emit
const scope = useVModel(props, 'modelValue', null)
</script>
