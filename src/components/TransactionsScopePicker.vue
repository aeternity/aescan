<template>
  <div>
    <scope-picker
      :scope="formattedScope"
      :is-scope-selected="isScopeSelected"
      placeholder="All Time"
      :clearable="true"
      @updated="selectScope"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const model = useVModel(props, 'modelValue', null)

const isScopeSelected = computed(() => {
  return !!model.value
})

function selectScope(interval) {
  model.value = interval
    ? {
      customInterval: {
        minStart: interval[0].toISOString().split('T')[0],
        maxStart: interval[1].toISOString().split('T')[0],
      },
    }
    : null
}

// todo move formating to store?
const formattedScope = computed(() => model.value
  ? [model.value.customInterval.minStart, model.value.customInterval.maxStart]
  : [])
</script>
